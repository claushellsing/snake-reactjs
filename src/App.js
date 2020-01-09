import React from 'react'
import logo from './logo.svg'
import Grid from './components/grid'
import Snake from './components/snake'
import { useInterval } from 'use-interval'
import {
  generateMap,
  initialSnakeMap,
  initialVector,
  snakeGame,
} from './snake/'
import './App.css'

function getVector(code) {
  console.log(code)
}

function App() {
  const rows = 50
  const columns = 50
  const [vector, setVector] = React.useState(initialVector())
  const [snakeMap, setSnakeMap] = React.useState(initialSnakeMap(rows, columns))
  const intervalRef = React.useRef()

  const stateGrid = {
    rows: rows,
    columns: columns,
    map: generateMap(rows, columns),
  }

  const updateVector = e => {
    if (e.keyCode === 37) {
      setVector([0, -1])
    } else if (e.keyCode === 38) {
      setVector([-1, 0])
    } else if (e.keyCode === 39) {
      setVector([0, 1])
    } else if (e.keyCode === 40) {
      setVector([1, 0])
    }
  }

  const game = snakeGame(rows, columns, vector, snakeMap)

  useInterval(() => {
    const sate = game.next(vector).value
    setSnakeMap(sate)
  }, 100)

  React.useEffect(() => {
    document.addEventListener('keyup', updateVector, false)
    return () => document.removeEventListener('keyup', updateVector, false)
  }, [])

  return (
    <div className="App">
      <Snake
        style={{ position: 'absolute' }}
        rows={rows}
        columns={columns}
        snakeMap={snakeMap}
      ></Snake>
      <Grid style={{ position: 'absolute' }} {...stateGrid}></Grid>
    </div>
  )
}

export default App
