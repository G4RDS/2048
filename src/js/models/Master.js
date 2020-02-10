import Board from '/js/models/Board'
import Controller from '/js/models/Controller'
import ScoreBoard from '/js/models/ScoreBoard'

const DEFAULT_SIZE = 4

export class Master {
  constructor({ el }) {
    this.el = el

    // board
    const boardEl = document.createElement('div')
    boardEl.id = 'board'
    el.appendChild(boardEl)
    this.board = new Board({
      el: boardEl,
      size: DEFAULT_SIZE,
    })

    // controller
    const controllerEl = document.createElement('div')
    controllerEl.id = 'controller'
    el.appendChild(controllerEl)
    this.controller = new Controller({
      el: controllerEl,
    })

    // score board
    const scoreBoardEl = document.createElement('div')
    scoreBoardEl.id = 'score-board'
    el.appendChild(scoreBoardEl)
    this.scoreBoard = new ScoreBoard({ el: scoreBoardEl })
  }
}
