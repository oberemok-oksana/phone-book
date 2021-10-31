// import User from "../models/user";
export default class UserServices {
  getAll() {
    return fetch(UserServices.BASE_URL + "users")
      .then((response) => response.json())
      .then((response) => response.users)
      .then((users) => users.map((user) => User.create(user)));
  }

  register(user) {
    return fetch(UserServices.BASE_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: user.login,
        password: user.password,
        date_born: user.bornDate,
      }),
    }).then((response) => response.json());
  }

  login(name, password) {
    return fetch(UserServices.BASE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: name,
        password: password,
      }),
    }).then((response) => response.json());
  }
}

UserServices.BASE_URL = "http://mag-contacts-api.herokuapp.com/";
