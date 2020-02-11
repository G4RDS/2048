export default class Box {
  constructor({ el, rank, coord }) {
    this.el = el
    this.rank = rank
    this.coord = coord

    this.updateStyle()
  }

  /**
   * スタイルやクラスを反映
   */
  updateStyle() {
    // コマノードに「rank-0」といったクラスを付与
    this.el.classList.add(`rank-${this.rank}`)

    // コマノードの背景をランクに対応したイラストにする
    this.el.style.backgroundImage = `url('/img/boxes/${this.rank}.png')`

    // コマノードの位置を変更
    this.el.style.transform = `translate(${this.coord.x * 5}rem, ${this.coord
      .y * 5}rem)`
  }

  /**
   * ランクを１上げる
   */
  incrementRank() {
    this.rank++
    this.updateStyle()
  }
}
