export class Controller {
  constructor() {
    this.buttons = []
    this.isDisabled = false
  }

  addButton(button) {
    this.buttons.push(button)
  }
}
