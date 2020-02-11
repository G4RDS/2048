import Box from './Box.js'
import Coord from './Coord.js'

export default class Board {
  constructor({ size }) {
    this.el = document.getElementById('board')
    this.size = size
    this.boxes = []
  }

  /**
   * コマをボードに追加する
   * coordがセットされていない場合、ランダムな位置にスポーン
   */
  addBox({ rank, coord }) {
    if (rank == null) throw new Error('[Board#addBox] rank is null')

    // ランダムな位置を決める
    if (coord == null) {
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
}
