import { useState, useEffect, useRef } from 'react'
import './App.css'

import { liveNeighbours } from './utils'


const DEFAULT_GRID_WIDTH = 103
const DEFAULT_GRID_HEIGHT = 103
const DEFAULT_GRID_SIZE = DEFAULT_GRID_WIDTH * DEFAULT_GRID_HEIGHT
const DEFAULT_GRID = Array(DEFAULT_GRID_SIZE).fill(null).map(v => Math.random() < 0.5 ? 0 : 1)
// const DEFAULT_GRID = Array(DEFAULT_GRID_SIZE).fill(null).map(v => 0)
// DEFAULT_GRID[52-DEFAULT_GRID_WIDTH*2-1] = 1
// DEFAULT_GRID[52-DEFAULT_GRID_WIDTH] = 1
// DEFAULT_GRID[50] = 1
// DEFAULT_GRID[51] = 1
// DEFAULT_GRID[52] = 1
const CELL_WIDTH = 8


function App() {
    const [gridSize, setGridSize] = useState([DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT])
    const [grid, setGrid] = useState(DEFAULT_GRID)
    const [step, setStep] = useState(0)
    const [speed, setSpeed] = useState(500)
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [run, setRun] = useState(true)

    useEffect(() => {
        // Canvas setup
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

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
        const ctx = contextRef.current
        let x, y
        for (let i = 0; i < grid.length; i++) {
            grid[i]
                ? ctx.fillStyle = "hsl(0, 0%, 13%)"
                : ctx.fillStyle = "hsl(0, 0%, 86%)"
            x = (i % gridSize[0]) * CELL_WIDTH
            y = parseInt(i / gridSize[0]) * CELL_WIDTH
            ctx.fillRect(x, y, CELL_WIDTH, CELL_WIDTH)
        }
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

    return (
        <main className="app">
            <p>{step}</p>
            <br/>
            <section className="controls">
            </section>

            <canvas ref={canvasRef}>
            </canvas>
            
        </main>
    )
}

export default App;
