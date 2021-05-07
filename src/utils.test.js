import { liveNeighbours } from './utils'

describe("liveNeighbours", () => {

    describe("at the top row", () => {

        test("Sums the neighbour at the top left", () => {
            let grid = [1, 0, 0, 0]
            let size = [2, 2]
            let i = 3
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbour at the top", () => {
            let grid = [0, 1, 0, 0]
            let size = [2, 2]
            let i = 3
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbour at the top right", () => {
            let grid = [0, 1, 0, 0]
            let size = [2, 2]
            let i = 2
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbours at the top left and top right", () => {
            let grid = [1, 0, 1, 0, 0, 0]
            let size = [2, 3]
            let i = 4
            expect(liveNeighbours(grid, size, i)).toEqual(2)
        })

        test("Sums the neighbours at the top row", () => {
            let grid = [1, 1, 1, 0, 0, 0]
            let size = [2, 3]
            let i = 4
            expect(liveNeighbours(grid, size, i)).toEqual(3)
        })

    })

    describe("at the same row", () => {

        test("Sums the neighbour at the left", () => {
            let grid = [1, 0]
            let size = [1, 2]
            let i = 1
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbour at the right", () => {
            let grid = [0, 1]
            let size = [1, 2]
            let i = 0
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbour at the left and right", () => {
            let grid = [1, 0, 1]
            let size = [1, 3]
            let i = 1
            expect(liveNeighbours(grid, size, i)).toEqual(2)
        })

    })

    describe("at the bottom row", () => {

        test("Sums the neighbour at the bottom left", () => {
            let grid = [0, 0, 1, 0]
            let size = [2, 2]
            let i = 1
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbour at the bottom", () => {
            let grid = [0, 0, 1, 0]
            let size = [2, 2]
            let i = 0
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbour at the bottom right", () => {
            let grid = [0, 0, 0, 1]
            let size = [2, 2]
            let i = 0
            expect(liveNeighbours(grid, size, i)).toEqual(1)
        })

        test("Sums the neighbours at the bottom left and bottom right", () => {
            let grid = [0, 0, 0, 1, 0, 1]
            let size = [2, 3]
            let i = 1
            expect(liveNeighbours(grid, size, i)).toEqual(2)
        })

        test("Sums the neighbours at the bottom row", () => {
            let grid = [0, 0, 0, 1, 1, 1]
            let size = [2, 3]
            let i = 1
            expect(liveNeighbours(grid, size, i)).toEqual(3)
        })

    })
    
})

