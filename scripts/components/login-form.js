class LoginForm {
  constructor(selector, userService, contactService, modalWindow) {
    this.selector = selector;
    this.userService = userService;
    this.contactService = contactService;
    this.modalWindow = modalWindow;

    $(() => {
      this.init();
      this.binds();
    });
  }

  init() {
    this.container = $(".login-form");
    this.loginInput = this.container.find("#login_user_login");
    this.passwordInput = this.container.find("#login_user_password");
    this.button = this.container.find("button");
    this.unauthorizedScreen = $(".unauthorized-screen");
    this.authorizedScreen = $(".authorized-screen");
    this.exitButton = $(".exit");
  }

  binds() {
    this.container.on("submit", (e) => {
      e.preventDefault();
      this.login(this.loginInput.val(), this.passwordInput.val());
    });
  }

  login(name, password) {
    this.userService.login(name, password).then((response) => {
      if (response.status === "error") this.modalWindow.show(response.error);
      else {
        if (this.loginInput.val() === "" || this.passwordInput.val() === "") {
          this.modalWindow.show("Please, type your data.");
        } else {
          this.successLogin();
          window.token = response.token;
          this.unauthorizedScreen.hide();
          this.authorizedScreen.show();

          new Contacts("", this.contactService, this.modalWindow);

          this.exitButton.show();
        }
      }
    });
  }

  successLogin() {
    this.modalWindow.show("Welcome!");
    this.loginInput.val("");
    this.passwordInput.val("");
  }
}
