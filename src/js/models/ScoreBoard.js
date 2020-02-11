export default class {
  constructor() {
    this.el = document.getElementById('score-board')
    this.updateScore(0)
  }

  updateScore(score) {
    this.score = score
    this.el.textContent = this.score
  }
}
