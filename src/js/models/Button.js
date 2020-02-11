export const BUTTON_DIRECTION = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
}

export default class Button {
  constructor({ el, direction, listener }) {
    this.isDisabled = false

    this.el = el
    this.direction = direction

    this.el.addEventListener('click', listener)
  }
}
