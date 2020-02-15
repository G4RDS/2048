import Box from './Box.js'
import Coord from './Coord.js'
import { BUTTON_DIRECTION } from './Button.js'

export default class Board {
  constructor({ size }) {
    this.el = document.getElementById('board')
    this.size = size
    this.boxes = []

    // ボードの初期化作業
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild)
  }

  /**
   * コマをボードに追加する
   * coordがセットされていない場合、ランダムな位置にスポーン
   *
   * 戻り値: bool - 追加が成功したかどうか、ボードが埋まっているときに失敗
   */
  addBox({ rank, coord }) {
    if (rank == null) throw new Error('[Board#addBox] rank is null')

    // ランダムな位置を決める
    if (coord == null) {
      if (this.boxes.length >= this.size ** 2) return false

      let x, y

      do {
        x = Math.floor(Math.random() * this.size)
        y = Math.floor(Math.random() * this.size)
      } while (this.boxes.some(b => b.coord.isEqual({ x, y })))

      coord = new Coord({ x, y })
    }

    // 追加するコマのノードを生成
    const boxEl = document.createElement('div')
    boxEl.classList.add('box')

    // コマインスタンスを生成
    const box = new Box({ el: boxEl, rank, coord })

    // コマを反映
    this.el.appendChild(boxEl)
    this.boxes.push(box)

    return true
  }

  /**
   * 指定されたインデックスのコマを削除する
   */
  deleteBox(index) {
    if (index == null) throw new Error('[Board#deleteBox] index is null')
    if (index < 0 || index >= this.boxes.length)
      throw new Error('[Board#deleteBox] index is not in the valid range')

    // コマノードを除去
    this.el.removeChild(this.boxes[index].el)

    // コマインスタンスをリストから削除
    this.boxes.splice(index, 1)
  }

  /**
   * ボードがコマで埋まっているかどうかを確認
   */
  getIsBoardFilled() {
    return this.boxes.length >= this.size ** 2
  }

  /**
   * 全てのコマを一度に同じ方向に移動させる
   * Promiseを返し、アニメーション完了後に次のステータスと加算するスコアでリゾルブする
   */
  moveBoxes(dir) {
    const lines = [[], [], [], []]
    const nextRanks = {}
    const { UP, LEFT, DOWN, RIGHT } = BUTTON_DIRECTION

    // 移動方向が縦なら列、横なら行でまとめる
    this.boxes.forEach(b => {
      if (dir === UP || dir === DOWN) {
        lines[b.coord.x].push(b)
      } else {
        lines[b.coord.y].push(b)
      }
    })

    // 各列（行）を移動方向と逆順にソート
    lines.forEach(l =>
      l.sort((a, b) => {
        switch (dir) {
          case UP:
            return a.coord.y - b.coord.y
          case LEFT:
            return a.coord.x - b.coord.x
          case DOWN:
            return b.coord.y - a.coord.y
          case RIGHT:
            return b.coord.x - a.coord.x
          default:
            return 0
        }
      })
    )

    // 各行処理を適用
    lines.forEach(l => {
      if (l.length === 0) return

      // 一番外側のコマは端まで移動
      if (dir === UP) l[0].coord.y = 0
      else if (dir === DOWN) l[0].coord.y = this.size - 1
      else if (dir === LEFT) l[0].coord.x = 0
      else if (dir === RIGHT) l[0].coord.x = this.size - 1

      for (let i = 1; i < l.length; i++) {
        // 一つ外側のコマと同じランクなら合成
        if (!l[i - 1].delete && l[i - 1].rank === l[i].rank) {
          nextRanks[l[i - 1].id] = l[i - 1].rank + 1
          l[i].delete = true
          l[i].coord.x = l[i - 1].coord.x
          l[i].coord.y = l[i - 1].coord.y
        } else {
          // 合成しないのなら、一つ外側のコマの隣に移動
          const bef = l[i - 1].delete ? l[i - 2] : l[i - 1]

          if (dir === UP) l[i].coord.y = bef.coord.y + 1
          else if (dir === DOWN) l[i].coord.y = bef.coord.y - 1
          else if (dir === LEFT) l[i].coord.x = bef.coord.x + 1
          else if (dir === RIGHT) l[i].coord.x = bef.coord.x - 1
        }
      }
    })

    // 更新
    this.boxes = lines.flat()
    this.boxes.forEach(b => b.updateStyle())

    // アニメーション完了後に解決するPromiseをリターン
    return new Promise(resolve => {
      setTimeout(() => {
        let score = 0

        // deleteフラグが立っているコマノードを除去
        this.boxes.forEach((b, i) => {
          if (b.delete) this.deleteBox(i)
        })

        // ランクを反映
        Object.entries(nextRanks).forEach(([id, rank]) => {
          // スコアをプラス
          score += rank * 100

          // rankが10になるとゲームをクリアにする
          if (rank === 10) {
            resolve({ status: 'CLEAR', score })
          }

          this.boxes.find(b => b.id === Number(id)).rank = rank
        })
        this.boxes.forEach(b => b.updateStyle())

        resolve({ status: 'CONTINUE', score })
      }, 500)
    })
  }
}
