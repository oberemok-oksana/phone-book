export default class User {
  constructor(login, password, bornDate) {
    this.login = login;
    this.bornDate = bornDate;
    this.password = password;
  }

  static create(user) {
    return new User(user.login, null, user["date_born"]);
  }
}
