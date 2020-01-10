import React from 'react'
import Cell from '../cell'

import './index.css'

function getGrid(rows, columns) {
  const grid = []

  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < columns; j++) {
      grid[i].push(<Cell key={`${i}-${j}`}></Cell>)
    }
  }

  return grid
}

function Grid({ map, rows, columns, style }) {
  const gridRows = React.useRef(getGrid(rows, columns))

  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 18px)`,
        gridTemplateRows: `repeat(${rows}, 18px)`,
      }}
    >
      {gridRows.current}
    </div>
  )
}

export default Grid
