const liveNeighbours = (grid, size, i) => {
    let sum = 0
    const [rows, cols] = size

    // Array index map to 2d array indices
    let row = parseInt(i / cols)
    let col = i - row * cols
    // console.log('Current location:', row, col)
    // Top row
    let currIndex
    if (row > 0) {
        currIndex = (row - 1) * cols + col
        // console.log('Current index:', currIndex)
        if (col > 0)
            // Top left (diagonal) 
            sum += grid[currIndex - 1] // (row - 1) * cols + col - 1
        // console.log('Current sum:', sum)
        // Top
        sum += grid[currIndex] // (row - 1) * cols + col
        // console.log('Current sum:', sum)
        if (col < cols - 1)
            // Top right (diagonal)
            sum += grid[currIndex + 1] // (row - 1) * cols + col + 1
        // console.log('Current sum:', sum)
    }

    // Same row
    if (col > 0)
        // Left
        sum += grid[i - 1]
    
    if (col < cols - 1)
        // Right
        sum += grid[i + 1]

    // Bottom row
    if (row < rows - 1) {        
        currIndex = (row + 1) * cols + col

        if (col > 0)
            // Bottom left (diagonal)
            sum += grid[currIndex - 1] // (row + 1) * cols + col - 1
        
        // Bottom
        sum += grid[currIndex] // (row + 1) * cols + col

        if (col < cols - 1)
            // Bottom right (diagonal)
            sum += grid[currIndex + 1] // (row + 1) * cols + col + 1
    }
    // console.log('Sum:', sum)
    return sum
}

const emptyGrid = (rows, cols) =>
    Array(rows * cols).fill(null).map(v => 0)

const randomGrid = (rows, cols, prob=0.5) => 
    Array(rows * cols).fill(null).map(v => 
        Math.random() > prob ? 0 : 1)

const gridWithLiveCells = (rows, cols, liveCells) => {
    const grid = emptyGrid(rows, cols)
    for (const index of liveCells) {
        grid[index] = 1
    }
    return grid
}

const glider = (row, col, gridSize) => {
    const [rows, cols] = gridSize
    const liveCells = []
    liveCells.push(row * cols + col)
    liveCells.push(row * cols + col + 1)
    liveCells.push(row * cols + col + 2)
    liveCells.push(row * cols + col + 2 - cols)
    liveCells.push(row * cols + col + 2 - cols * 2 - 1)
    return gridWithLiveCells(rows, cols, liveCells)
}

const gosperGliderGun = (row, col, gridSize) => {
    const [rows, cols] = gridSize
    const liveCells = []
    liveCells.push(cols * 5)
    liveCells.push(cols * 5 + 1)
    liveCells.push(cols * 6)
    liveCells.push(cols * 6 + 1)

    liveCells.push(cols * 5 + 10)
    liveCells.push(cols * 6 + 10)
    liveCells.push(cols * 7 + 10)
    liveCells.push(cols * 8 + 11)
    liveCells.push(cols * 9 + 12)
    liveCells.push(cols * 9 + 13)

    liveCells.push(cols * 4 + 11)
    liveCells.push(cols * 3 + 12)
    liveCells.push(cols * 3 + 13)

    liveCells.push(cols * 6 + 14)

    liveCells.push(cols * 4 + 15)
    liveCells.push(cols * 5 + 16)
    liveCells.push(cols * 6 + 16)
    liveCells.push(cols * 6 + 17)
    liveCells.push(cols * 7 + 16)
    liveCells.push(cols * 8 + 15)

    liveCells.push(cols * 3 + 20)
    liveCells.push(cols * 3 + 21)
    liveCells.push(cols * 4 + 20)
    liveCells.push(cols * 4 + 21)
    liveCells.push(cols * 5 + 20)
    liveCells.push(cols * 5 + 21)
    liveCells.push(cols * 2 + 22)
    liveCells.push(cols * 6 + 22)

    liveCells.push(cols * 1 + 24)
    liveCells.push(cols * 2 + 24)
    liveCells.push(cols * 6 + 24)
    liveCells.push(cols * 7 + 24)

    liveCells.push(cols * 3 + 34)
    liveCells.push(cols * 3 + 35)
    liveCells.push(cols * 4 + 34)
    liveCells.push(cols * 4 + 35)

    


    return gridWithLiveCells(rows, cols, liveCells)
}

export {
    liveNeighbours,
    emptyGrid,
    randomGrid,
    glider,
    gosperGliderGun
}