import Board from '/js/models/Board'
import Controller from '/js/models/Controller'
import ScoreBoard from '/js/models/ScoreBoard'
import Button, { BUTTON_DIRECTION } from './Button'

const DEFAULT_SIZE = 4

export class Master {
  constructor({ el }) {
    this.el = el

    this.board = new Board({ size: DEFAULT_SIZE })
    this.controller = new Controller()
    this.controller.addButton(new Button({ direction: BUTTON_DIRECTION.LEFT }))
    this.controller.addButton(new Button({ direction: BUTTON_DIRECTION.UP }))
    this.controller.addButton(new Button({ direction: BUTTON_DIRECTION.RIGHT }))
    this.controller.addButton(new Button({ direction: BUTTON_DIRECTION.DOWN }))
    this.scoreBoard = new ScoreBoard()
  }
}
