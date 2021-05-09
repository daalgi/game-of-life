import { useState, useEffect, useRef } from 'react'

import Controls from './Controls'
import SideBar from './SideBar'
import {
    liveNeighbours, emptyGrid, randomGrid, glider, gosperGliderGun
} from '../utils'
import './App.css'


const GRID_ROWS = 38
const GRID_COLS = 38
const CELL_WIDTH = 19
const GRID_STROKE = 1

function App() {
    const [gridSize, setGridSize] = useState([GRID_ROWS, GRID_COLS])
    const [grid, setGrid] = useState(emptyGrid(GRID_ROWS, GRID_COLS))
    const [step, setStep] = useState(0)
    const [speed, setSpeed] = useState(500)
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [run, setRun] = useState(false)
    const [pencil, setPencil] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    useEffect(() => {
        // Canvas setup
        const canvas = canvasRef.current
        let width = gridSize[1] * CELL_WIDTH + GRID_STROKE
        let height = gridSize[0] * CELL_WIDTH + GRID_STROKE
        canvas.width = width * 2
        canvas.height = height * 2
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        const ctx = canvas.getContext("2d")
        ctx.scale(2, 2)
        ctx.lineCap = "round"
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5
        ctx.fillStyle = "hsl(0, 0%, 80%)"
        contextRef.current = ctx
    }, [])

    useEffect(() => {
        // Step increase
        let interval
        if (run) {
            interval = setInterval(() => setStep(step + 1), speed)
            setGrid(handleUpdateGrid())
        }
        return () => clearInterval(interval)
    }, [step])

    useEffect(() => {
        // Draw grid
        // Note: only square grids are valid
        const ctx = contextRef.current
        let width = CELL_WIDTH * gridSize[1]
        let height = CELL_WIDTH * gridSize[0]
        let x, y

        // Background
        ctx.fillStyle = "hsl(0, 0%, 86%)"
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

        for (let i = 0; i < grid.length; i++) {

            x = (i % gridSize[1]) * CELL_WIDTH
            y = parseInt(i / gridSize[0]) * CELL_WIDTH

            // Grid
            ctx.fillStyle = "hsl(0, 0%, 50%)"
            ctx.fillRect(x, 0, GRID_STROKE, height)
            ctx.fillRect(0, y, width, GRID_STROKE)

            // Live cells
            if (grid[i]) {
                ctx.fillStyle = "hsl(0, 0%, 13%)"
                ctx.fillRect(
                    x + GRID_STROKE * 2,
                    y + GRID_STROKE * 2,
                    CELL_WIDTH - GRID_STROKE * 3,
                    CELL_WIDTH - GRID_STROKE * 3)
            }
        }

        // Grid last lines
        ctx.fillStyle = "hsl(0, 0%, 50%)"
        ctx.fillRect(width, 0, GRID_STROKE, height)
        ctx.fillRect(0, height, width, GRID_STROKE)


    }, [grid])

    const handleUpdateGrid = () => {
        const newGrid = [...grid]
        let neighbours = 0
        for (let i = 1; i < grid.length; i++) {
            neighbours = liveNeighbours(grid, gridSize, i)
            if (grid[i])
                newGrid[i] = neighbours == 2 || neighbours == 3
                    ? 1
                    : 0
            else
                newGrid[i] = neighbours == 3 ? 1 : 0

        }
        // newGrid[1] = !newGrid[1]
        return newGrid
    }

    const handlePlayStop = () => {
        setRun(!run)
        setStep(step + 1)
    }

    const handleClearGrid = () => {
        setRun(false)
        setStep(0)
        setGrid(emptyGrid(...gridSize))
    }

    const handleRandomGrid = () => {
        setRun(false)
        setStep(0)
        setGrid(randomGrid(...gridSize, 0.2))
    }

    const handleGliderGrid = () => {
        setRun(false)
        setStep(0)
        setGrid(glider(3, 3, gridSize))
    }

    const handleGosperGliderGun = () => {
        setRun(false)
        setStep(0)
        setGrid(gosperGliderGun(5, 5, gridSize))
    }

    const handlePencilToggle = () => setPencil(!pencil)

    const handleMouseDown = ({ nativeEvent }) => {
        setIsMouseDown(true)
        pencil
            ? handleMouseMove({ nativeEvent })
            : handleEditCell({ nativeEvent })
    }
    const handleEditCell = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        let row = Math.floor(offsetY / CELL_WIDTH)
        let col = Math.floor(offsetX / CELL_WIDTH)
        let newGrid = [...grid]
        newGrid[row * gridSize[1] + col] ^= 1
        setGrid(newGrid)
    }

    const handleMouseMove = ({ nativeEvent }) => {
        if (!pencil || !isMouseDown)
            return
        const { offsetX, offsetY } = nativeEvent
        let row = Math.floor(offsetY / CELL_WIDTH)
        let col = Math.floor(offsetX / CELL_WIDTH)
        let newGrid = [...grid]
        newGrid[row * gridSize[1] + col] = 1
        setGrid(newGrid)
    }

    const handleChangeSpeed = value =>
        setSpeed(parseInt(value))

    return (
        <div className="app">
            <a id="logo" href="https://daalgi.github.io/my-site" target="_blank">David A.G.</a>
            <h1 id="title">Conway's Game of Life</h1>
            <Controls
                className="controls"
                run={run}
                step={step}
                pencil={pencil}
                speed={speed}
                onChangeSpeed={handleChangeSpeed}
                onPencilToggle={handlePencilToggle}
                onPlayStop={handlePlayStop}
                onClearGrid={handleClearGrid}
            />
            <SideBar
                className="sidebar"
                onRandomGrid={handleRandomGrid}
                onGliderGrid={handleGliderGrid}
                onGosperGliderGun={handleGosperGliderGun}
            />
            <canvas
                className="main"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsMouseDown(false)}
            ></canvas>
        </div>
    )
}

export default App;
