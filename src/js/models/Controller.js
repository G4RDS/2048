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
        el: document.getElementById('controller--left'),
        direction: BUTTON_DIRECTION.LEFT,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.LEFT),
      }),
      right: new Button({
        el: document.getElementById('controller--right'),
        direction: BUTTON_DIRECTION.RIGHT,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.RIGHT),
      }),
      up: new Button({
        el: document.getElementById('controller--up'),
        direction: BUTTON_DIRECTION.UP,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.UP),
      }),
      down: new Button({
        el: document.getElementById('controller--down'),
        direction: BUTTON_DIRECTION.DOWN,
        listener: () => this.notifyPressEvent(BUTTON_DIRECTION.DOWN),
      }),
    }
  }

  /**
   * イベントリスナおよびノティファイヤ
   * ボタンが押されると呼ばれ、イベントリスナを呼ぶ
   */
  notifyPressEvent(direction) {
    if (this.listener == null) return

    this.listener(direction)
  }

  /**
   * 全てのボタンを無効化
   */
  disable() {
    Object.values(this.buttons).forEach(b => b.disable())
  }

  /**
   * 全てのボタンを有効化
   */
  enable() {
    Object.values(this.buttons).forEach(b => b.enable())
  }
}
