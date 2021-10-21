class UserServices {
  register(user) {
    return $.ajax({
      url: UserServices.BASE_URL + "register",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        login: user.login,
        password: user.password,
        date_born: user.bornDate,
      }),
    });
  }

  login(name, password) {
    return $.ajax({
      url: UserServices.BASE_URL + "login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify({
        login: name,
        password: password,
      }),
    });
  }
}

UserServices.BASE_URL = "http://mag-contacts-api.herokuapp.com/";
