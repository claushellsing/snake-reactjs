import React from 'react'
import Cell from '../cell'

import './index.css'

function Grid({ map, rows, columns, style }) {
  const gridRows = []

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      gridRows.push(<Cell key={`${i}-${j}`}></Cell>)
    }
  }

  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 18px)`,
        gridTemplateRows: `repeat(${rows}, 18px)`,
      }}
    >
      {gridRows}
    </div>
  )
}

export default Grid
