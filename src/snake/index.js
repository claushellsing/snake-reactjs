import { random } from 'lodash'

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
  ]
}

function initialVector() {
  return [1, 0]
}

function getRandomCoord(rows, columns) {
  return [random(0, rows - 1), random(0, columns - 1)]
}

function isCoordInList(coord, coords) {
  for (let i = 0; i < coords.length; i++) {
    if (isSameCoord(coords[i], coord)) {
      return true
    }
  }

  return false
}

function isSameCoord(coordA, coordB) {
  return coordA[0] === coordB[0] && coordA[1] === coordB[1]
}

function didSnakeHitWalls(rows, columns, snake) {
  const head = snake[0]
  console.log(
    head,
    [rows, columns],
    head[0] < 0 || head[0] >= rows || head[1] < 0 || head[1] >= columns,
  )
  return head[0] < 0 || head[0] >= rows || head[1] < 0 || head[1] >= columns
}

function* getFilteredRandomCoord(rows, columns, coords) {
  let coord = null

  if (coords.length >= rows * columns) return null

  do {
    coord = getRandomCoord(rows, columns)
    if (!isCoordInList(coord, coords)) {
      coords = yield coord
    }
  } while (true)
}

function* snakeGame(rows, columns, vector, snake) {
  const appleGen = getFilteredRandomCoord(rows, columns, snake)
  let apples = [appleGen.next().value]
  while (true) {
    snake = moveSnake(snake, vector)

    if (didSnakeHitWalls(rows, columns, snake)) {
      break
    }
    if (isSameCoord(snake[0], apples[0])) {
      //eat apple
      apples = [appleGen.next(snake).value]
      snake.push(snake[0])
    }
    vector = yield { snake, apples, running: true }
  }

  yield { snake, apples, running: false }
}

export { generateMap, initialSnakeMap, initialVector, snakeGame }
