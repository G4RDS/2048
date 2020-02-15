export default class FinishEffect {
  constructor({ el }) {
    this.el = el
  }

  async show() {
    this.el.classList.add('shown')

    return new Promise(resolve => {
      setTimeout(() => resolve(), 500)
    })
  }

  hide() {
    this.el.classList.remove('shown')
  }
}
