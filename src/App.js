import React, { useState } from 'react'
import './App.scss'

const SIZE = 4
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40

function App() {
  let crtBoxId = 0
  const [boxes, setBoxes] = useState([
    {
      id: 0,
      x: 0,
      y: 0,
      rank: 0,
    },
    {
      id: 1,
      x: 2,
      y: 0,
      rank: 0,
    },
  ])

  const moveBoxes = dir => {
    const _boxes = [...boxes]
    const lines = [[], [], [], []]

    // 移動方向が縦なら列、横なら行でまとめる
    _boxes.forEach(b => {
      if (dir === UP || dir === DOWN) {
        lines[b.x].push(b)
      } else {
        lines[b.y].push(b)
      }
    })

    // 各列（行）をソート
    lines.forEach(l =>
      l.sort((a, b) => {
        switch (dir) {
          case UP:
            return a.y - b.y
          case LEFT:
            return a.x - b.x
          case DOWN:
            return b.y - a.y
          case RIGHT:
            return b.x - a.x
          default:
            return 0
        }
      })
    )

    // 各行処理を適用
    lines.forEach(l => {
      if (l.length === 0) return

      // 一番外側のコマは端まで移動
      if (dir === UP) l[0].y = 0
      else if (dir === DOWN) l[0].y = SIZE - 1
      else if (dir === LEFT) l[0].x = 0
      else if (dir === RIGHT) l[0].x = SIZE - 1

      for (let i = 1; i < l.length; i++) {
        // 一つ外側のコマと同じランクなら合成
        if (!l[i - 1].delete && l[i - 1].rank === l[i].rank) {
          l[i - 1].rank++
          l[i].delete = true
        } else {
          // 合成しないのなら、一つ外側のコマの隣に移動
          const bef = l[i - 1].delete ? l[i - 2] : l[i - 1]

          if (dir === UP) l[i].y = bef.y + 1
          else if (dir === DOWN) l[i].y = bef.y - 1
          else if (dir === LEFT) l[i].x = bef.x + 1
          else if (dir === RIGHT) l[i].x = bef.x - 1
        }
      }
    })

    // ステートを更新
    setBoxes(
      lines
        .map(l => {
          return l.filter(b => !b.delete)
        })
        .flat()
    )
  }

  const handleKeyDown = e => {
    if (e.keyCode >= LEFT && e.keyCode <= DOWN) {
      moveBoxes(e.keyCode)
    }
  }

  return (
    <div id="app" tabIndex="0" onKeyDown={handleKeyDown}>
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

            return <div className="box" style={style} key={b.id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default App
