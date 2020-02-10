import Button, { BUTTON_DIRECTION } from './Button'

export class Controller {
  constructor({ el }) {
    this.el = el

    const leftButtonEl = document.createElement('button')
    leftButtonEl.classList.add('left')
    el.appendChild(leftButtonEl)
    const upButtonEl = document.createElement('button')
    upButtonEl.classList.add('up')
    el.appendChild(upButtonEl)
    const rightButtonEl = document.createElement('button')
    rightButtonEl.classList.add('right')
    el.appendChild(rightButtonEl)
    const downButtonEl = document.createElement('button')
    downButtonEl.classList.add('down')
    el.appendChild(downButtonEl)
    this.buttons = {
      left: new Button({ el: leftButtonEl, directin: BUTTON_DIRECTION.LEFT }),
      right: new Button({
        el: rightButtonEl,
        directin: BUTTON_DIRECTION.RIGHT,
      }),
      up: new Button({ el: upButtonEl, directin: BUTTON_DIRECTION.UP }),
      down: new Button({ el: downButtonEl, directin: BUTTON_DIRECTION.DOWN }),
    }
    this.isDisabled = false
  }
}
