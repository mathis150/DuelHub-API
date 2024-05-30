export class USER {
  _data = {}

  constructor(json) {
    this._data = json
  }

  get _id() {
    return this._data._id
  }

  get handle() {
    return this._data.handle
  }
  get username() {
    return this._data.username
  }
  get password() {
    return this._data.password
  }
  get password_salt() {
    return this._data.password_salt
  }
  get email() {
    return this._data.email
  }
  get verified() {
    return this._data.verified
  }
  get rank() {
    return this._data.rank
  }
}