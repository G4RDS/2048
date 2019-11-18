import React, { useState } from 'react'
import './App.scss'

function App() {
  let crtBoxId = 0
  const [boxes, setBoxes] = useState([
    {
      id: 0,
      x: 0,
      y: 0,
      rank: 0,
    },
  ])

  const moveBox = id => {
    const newBoxes = [...boxes]
    const box = newBoxes.find(b => b.id === id)

    if (Math.random() >= 0.5) box.x = Math.floor(Math.random() * 4)
    else box.y = Math.floor(Math.random() * 4)

    setBoxes(newBoxes)
  }

  return (
    <div id="app">
      <div id="board-container">
        <div id="board">
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
        <div id="boxes">
          {boxes.map(b => {
            const style = {
              transform: `translate(${b.x * 5}rem, ${b.y * 5}rem)`,
            }

            return (
              <div
                className="box"
                style={style}
                onClick={() => moveBox(b.id)}
                key={b.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
