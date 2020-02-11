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
   * ゲームの初期化処理
   */
  init() {
    // 二つのコマをランダムな位置にスポーンさせる
    this.board.addBox({ rank: 0, coord: null })
    this.board.addBox({ rank: 0, coord: null })

    // 待機状態をfalseに
    this.isWaiting = false
  }

  /**
   * コントローラのボタンのクリックイベントリスナ
   */
  onButtonPressed(direction) {
    console.log(`button pressed: ${direction}`)
    this.scoreBoard.updateScore(direction)
  }
}
