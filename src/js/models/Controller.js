import Button, { BUTTON_DIRECTION } from './Button.js'

export default class Controller {
  constructor({ listener }) {
    this.listener = listener

    this.el = document.getElementById('controller')

    /**
     * ボタンインスタンスを生成
     */
    this.buttons = {
      left: new Button({
        el: document.getElementById('left-button'),
        direction: BUTTON_DIRECTION.LEFT,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.LEFT),
      }),
      right: new Button({
        el: document.getElementById('right-button'),
        direction: BUTTON_DIRECTION.RIGHT,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.RIGHT),
      }),
      up: new Button({
        el: document.getElementById('up-button'),
        direction: BUTTON_DIRECTION.UP,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.UP),
      }),
      down: new Button({
        el: document.getElementById('down-button'),
        direction: BUTTON_DIRECTION.DOWN,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.DOWN),
      }),
    }
    this.isDisabled = false
  }

  /**
   * イベントリスナおよびノティファイヤ
   * ボタンが押されると呼ばれ、イベントリスナを呼ぶ
   */
  notifyPressEvent(direction) {
    if (this.listener == null) return

    this.listener(direction)
  }
}
