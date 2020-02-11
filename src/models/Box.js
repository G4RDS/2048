class Box {
  constructor({ id, rank, coord }) {
    this.id = id == null ? this.proto.crtId : id
    this.rank = rank
    this.coord = coord
  }
}

Box.prototype.proto = {
  crtId: 0,
}

export default Box
