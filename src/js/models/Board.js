export class Board {
  constructor({ el, size }) {
    this.el = el
    this.size = size
    this.boxes = []
  }

  addBox(el) {
    this.el.appendChild(el)
    this.boxes.push(el)
  }
}
