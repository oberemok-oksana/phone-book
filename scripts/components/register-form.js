class RegisterForm {
  constructor(selector, userService, modalWindow) {
    this.selector = selector;
    this.userService = userService;
    this.modalWindow = modalWindow;
    this.onRegister = () => {};
    $(() => {
      this.init();
      this.binds();
    });
  }

  init() {
    this.container = $(this.selector);
    this.loginInput = this.container.find("#register_user_login");
    this.passwordInput = this.container.find("#register_user_password");
    this.bornInput = this.container.find("#register_user_born");
    this.button = this.container.find("button");
  }

  binds() {
    this.container.on("submit", (e) => {
      debugger;
      e.preventDefault();
      this.register();
    });
  }

  register() {
    let user = new User(
      this.loginInput.val(),
      this.passwordInput.val(),
      this.bornInput.val()
    );

    this.userService.register(user).then((response) => {
      if (response.status === "error") {
        this.registerError(response.error);
      } else {
        this.successRegister();
      }
    });
  }

  registerError(text) {
    this.modalWindow.show(text);
  }

  successRegister() {
    this.clearForm();
    this.modalWindow.show(
      "Congratulation! You have been registered successfully."
    );
    this.onRegister();
  }

  clearForm() {
    this.passwordInput.val("");
    this.bornInput.val("");
    this.loginInput.val("");
  }
}
