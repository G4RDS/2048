import Board from '/js/models/Board.js'
import Controller from '/js/models/Controller.js'
import ScoreBoard from '/js/models/ScoreBoard.js'

const DEFAULT_SIZE = 4

export default class Master {
  constructor() {
    this.el = document.getElementById('app')

    this.board = new Board({
      size: DEFAULT_SIZE,
    })
    this.controller = new Controller({
      listener: this.onButtonPressed.bind(this), // thisをbindしないと、イベントリスナが呼ばれるときにthisがその呼ぶインスタンスになってしまう
    })
    this.scoreBoard = new ScoreBoard()

    // trueのとき、アニメーションなどが行われているため、ターンは行わない
    this.isWaiting = false

    this.init()
  }

  /**
   * コントローラのボタンのクリックイベントリスナ
   */
  async onButtonPressed(direction) {
    this.controller.disable()
    await this.moveBoxes(direction)
    this.controller.enable()
  }

  /**
   * ゲームの初期化処理
   */
  init() {
    this.board = new Board({
      size: DEFAULT_SIZE,
    })

    // 二つのコマをランダムな位置にスポーンさせる
    this.board.addBox({ rank: 0, coord: null })
    this.board.addBox({ rank: 0, coord: null })

    // 待機状態をfalseに
    this.isWaiting = false
  }

  /**
   * ランダムな位置にランダムなランクのコマをスポーンさせる
   */
  spawnRandomBox() {
    this.board.addBox({ rank: Math.random() < 0.7 ? 0 : 1, coord: null })
  }

  /**
   * コマを移動させる
   */
  moveBoxes(direction) {
    return this.board.moveBoxes(direction).then(({ status, score }) => {
      this.scoreBoard.addScore(score)

      if (status === 'CLEAR') {
        alert(
          `[GAME CLEAR]\nビックバンが発生し、ゲームクリアとなりました。\n最終スコア：${this.scoreBoard.score}`
        )

        return
      }

      // ボードがコマでうまっている場合、ゲームを終了する
      if (this.board.getIsBoardFilled()) {
        alert(
          `[GAME OVER]\n初めからやり直すにはOKをクリックしてください\n最終スコア：${this.scoreBoard.core}`
        )

        this.init()

        return
      }

      // 新しいコマを出現させる
      this.spawnRandomBox()
    })
  }
}
