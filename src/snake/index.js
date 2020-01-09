function generateMap(rows, columns) {
  const grid = []

  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < columns; j++) {
      grid[i][j] = 0
    }
  }
  return grid
}

function moveSnake(snakeMap, vector) {
  let prev = null
  return snakeMap.map(([row, column]) => {
    if (prev === null) {
      prev = [row, column]
      return [row + vector[0], column + vector[1]]
    } else {
      const next = [prev[0], prev[1]]
      prev = [row, column]
      return next
    }
  })
}

function initialSnakeMap(rows, columns) {
  return [
    [Math.floor(rows / 2), Math.floor(columns / 2)],
    [Math.floor(rows / 2) - 1, Math.floor(columns / 2)],
    [Math.floor(rows / 2) - 2, Math.floor(columns / 2)],
    [Math.floor(rows / 2) - 3, Math.floor(columns / 2)],
    [Math.floor(rows / 2) - 4, Math.floor(columns / 2)],
    [Math.floor(rows / 2) - 5, Math.floor(columns / 2)],
  ]
}

function initialVector() {
  return [1, 0]
}

function* snakeGame(rows, columns, vector, snake) {
  do {
    snake = moveSnake(snake, vector)
    vector = yield snake
  } while (true)
}

export { generateMap, initialSnakeMap, initialVector, snakeGame }
