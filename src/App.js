import React, { useState, useRef } from 'react'
import './App.scss'

import Box from './models/Box'
import Coord from './models/Coord'

import TheBoard from './components/TheBoard'

const SIZE = 4
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40

const App = () => {
  const [boxes, setBoxes] = useState([
    new Box({ rank: 0, coord: new Coord({ x: 0, y: 0 }) }),
    new Box({ rank: 0, coord: new Coord({ x: 0, y: 2 }) }),
  ])

  const isMoving = useRef(false)

  const moveBoxes = dir => {
    let _boxes = [...boxes]
    const lines = [[], [], [], []]
    const nextRanks = {}

    if (isMoving.current) return
    isMoving.current = true

    // 移動方向が縦なら列、横なら行でまとめる
    _boxes.forEach(b => {
      if (dir === UP || dir === DOWN) {
        lines[b.x].push(b)
      } else {
        lines[b.y].push(b)
      }
    })

    // 各列（行）を移動方向と逆順にソート
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
          nextRanks[l[i - 1].id] = l[i - 1].rank + 1
          l[i].delete = true
          l[i].x = l[i - 1].x
          l[i].y = l[i - 1].y
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
    _boxes = lines.flat()
    setBoxes(_boxes)

    // アニメーション完了後
    setTimeout(() => {
      _boxes = _boxes.filter(b => !b.delete)

      // ランクを反映
      Object.keys(nextRanks).forEach(id => {
        _boxes.find(b => b.id === Number(id)).rank = nextRanks[id]
      })

      // ボードがコマでうまっている場合、ゲームを終了する
      if (_boxes.length >= SIZE * SIZE) {
        alert('[GAME OVER]\n初めからやり直すにはOKをクリックしてください')
        setBoxes([
          new Box({
            coord: new Coord({
              x: Math.floor(Math.random() * SIZE),
              y: Math.floor(Math.random() * (SIZE / 2)),
            }),
            rank: 0,
          }),
          new Box({
            coord: new Coord({
              x: Math.floor(Math.random() * (SIZE / 2)),
              y: Math.floor(Math.random() * SIZE),
            }),
            rank: 0,
          }),
        ])
        isMoving.current = false
        return
      }

      // 新しいコマを出現させる
      _boxes = spawnBox(_boxes)

      setBoxes(_boxes)

      isMoving.current = false
    }, 500)
  }

  const spawnBox = _boxes => {
    const rank = Math.random() < 0.7 ? 0 : 1
    let x, y

    do {
      x = Math.floor(Math.random() * SIZE)
      y = Math.floor(Math.random() * SIZE)
      // eslint-disable-next-line no-loop-func
    } while (_boxes.some(b => b.x === x && b.y === y))

    return [..._boxes, new Box({ coord: new Coord({ x, y }), rank })]
  }

  const handleKeyDown = e => {
    if (e.keyCode >= LEFT && e.keyCode <= DOWN) {
      moveBoxes(e.keyCode)
    }
  }

  return (
    <div id="app" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="board-container">
        <TheBoard boxes={boxes} />
      </div>
    </div>
  )
}

export default App
