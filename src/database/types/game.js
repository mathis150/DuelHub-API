export class Game {
  _data = {}

  constructor(json) {
    this._data = json
  }

  get _id() {
    return this._data._id
  }

  get title() {
    return this._data.title
  }
  get series() {
    return this._data.series
  }
  get banner() {
    return this._data.banner
  }
}