import React from 'react'
import './index.css'

export default function Layer({ coords, columns, rows, style, color }) {
  return (
    <div
      className={'grid'}
      style={{
        ...style,
        gridTemplateColumns: `repeat(${columns}, 18px)`,
        gridTemplateRows: `repeat(${rows}, 18px)`,
      }}
    >
      {coords.map(([row, column], key) => {
        return (
          <div
            key={`${key}`}
            className="part"
            style={{
              gridArea: `${row + 1} / ${column + 1} / ${row + 2} / ${column +
                2}`,
              backgroundColor: color,
            }}
          ></div>
        )
      })}
    </div>
  )
}
