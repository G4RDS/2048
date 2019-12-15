import React from 'react'

const TheBoard = () => (
  <div className="board">
    {Array(16)
      .fill()
      .map((v, i) => {
        let cl
        if (Math.floor((i / 4) % 2) === 0) {
          cl = i % 2 ? 'orange' : 'yellow'
        } else {
          cl = !(i % 2) ? 'orange' : 'yellow'
        }
        return <div className={`square ${cl}`} key={i} />
      })}
  </div>
)

export default TheBoard
