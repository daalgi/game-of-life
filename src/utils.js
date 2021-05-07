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

export {
    liveNeighbours
}