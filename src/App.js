import React, { useCallback } from 'react'
import logo from './logo.svg'
import Grid from './components/grid'
import Layer from './components/layer'
import { useInterval } from 'use-interval'
import {
  generateMap,
  initialSnakeMap,
  initialVector,
  snakeGame,
} from './snake/'
import './App.css'

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.state,
      }
      break
    case 'stop':
      return {
        ...state,
        ...action.state,
        running: false,
      }
      break
    default:
      return state
  }
}

function App() {
  const rows = 50
  const columns = 50
  const [vector, setVector] = React.useState(initialVector())
  const stepPace = React.useRef(300)
  const [state, dispatch] = React.useReducer(reducer, {
    snakeMap: initialSnakeMap(rows, columns),
    applesMap: [],
    running: true,
  })
  const game = React.useRef()

  const stateGrid = React.useRef({
    rows: rows,
    columns: columns,
    map: generateMap(rows, columns),
  })

  React.useEffect(() => {
    game.current = snakeGame(rows, columns, vector, state.snakeMap)
  }, [])

  useInterval(
    () => {
      const { snake, apples, running } = game.current.next(vector).value

      if (running) {
        dispatch({
          type: 'update',
          state: {
            snakeMap: snake,
            applesMap: apples,
          },
        })
      } else {
        dispatch({
          type: 'stop',
          state: {
            snakeMap: snake,
            applesMap: apples,
          },
        })
      }
    },
    state.running ? stepPace.current : null,
  )

  React.useEffect(() => {
    const updateVector = e => {
      if (e.keyCode === 37) {
        if (vector[0] !== 0 && vector[1] !== 1) {
          setVector([0, -1])
        }
      } else if (e.keyCode === 38) {
        if (vector[0] !== 1 && vector[1] !== 0) {
          setVector([-1, 0])
        }
      } else if (e.keyCode === 39) {
        if (vector[0] !== 0 && vector[1] !== -1) {
          setVector([0, 1])
        }
      } else if (e.keyCode === 40) {
        if (vector[0] !== -1 && vector[1] !== 0) {
          setVector([1, 0])
        }
      }
    }

    document.addEventListener('keyup', updateVector, false)
    return () => document.removeEventListener('keyup', updateVector, false)
  }, [vector])

  return (
    <div className="App">
      <Layer
        style={{ position: 'absolute' }}
        rows={rows}
        columns={columns}
        coords={state.applesMap}
        color={`red`}
      ></Layer>
      <Layer
        style={{ position: 'absolute' }}
        rows={rows}
        columns={columns}
        coords={state.snakeMap}
        color={`black`}
      ></Layer>
      <Grid style={{ position: 'absolute' }} {...stateGrid.current}></Grid>
    </div>
  )
}

export default App
