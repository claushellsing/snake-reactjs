import React from 'react'
import './index.css'

export default function Snake({ snakeMap, columns, rows, style }) {
  return (
    <div
      className={'snakeGrid'}
      style={{
        ...style,
        gridTemplateColumns: `repeat(${columns}, 18px)`,
        gridTemplateRows: `repeat(${rows}, 18px)`,
      }}
    >
      {snakeMap.map(([row, column], key) => {
        return (
          <div
            key={`${key}`}
            className="part"
            style={{
              gridArea: `${row} / ${column} / ${row + 1} / ${column + 1}`,
            }}
          >
            {key === 0 ? 'o' : 'x'}
          </div>
        )
      })}
    </div>
  )
}
