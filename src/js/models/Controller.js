import Button, { BUTTON_DIRECTION } from './Button.js'

export default class Controller {
  constructor() {
    this.el = document.getElementById('controller')

    this.buttons = {
      left: new Button({
        el: document.getElementById('left-btn'),
        directin: BUTTON_DIRECTION.LEFT,
      }),
      right: new Button({
        el: document.getElementById('right-btn'),
        directin: BUTTON_DIRECTION.RIGHT,
      }),
      up: new Button({
        el: document.getElementById('up-btn'),
        directin: BUTTON_DIRECTION.UP,
      }),
      down: new Button({
        el: document.getElementById('down-btn'),
        directin: BUTTON_DIRECTION.DOWN,
      }),
    }
    this.isDisabled = false
  }
}
