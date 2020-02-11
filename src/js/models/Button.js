export const BUTTON_DIRECTION = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
}

export default class Button {
  constructor({ direction }) {
    this.direction = direction
    this.isDisabled = false
  }
}
