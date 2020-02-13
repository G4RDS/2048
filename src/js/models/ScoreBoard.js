export default class ScoreBoard {
  constructor() {
    this.el = document.getElementById('score-board--value')
    this.updateScore(0)
  }

  updateScore(score) {
    this.score = score
    this.el.textContent = this.score
  }

  addScore(score) {
    this.score += score
    this.el.textContent = this.score
  }
}
