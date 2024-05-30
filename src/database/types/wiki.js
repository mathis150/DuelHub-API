export class Wiki {
  _data = {}

  constructor(json) {
    this._data = json
  }

  get _id() {
    return this._data._id
  }

  get game() {
    return this._data.game
  }
  get internal_link() {
    return this._data.internal_link
  }
  get external_link() {
    return this._data.external_link
  }
}