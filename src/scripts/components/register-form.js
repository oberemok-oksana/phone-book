class RegisterForm {
  constructor(selector, userService, modalWindow) {
    this.selector = selector;
    this.userService = userService;
    this.modalWindow = modalWindow;
    this.onRegister = () => {};
    document.addEventListener("DOMContentLoaded", () => {
      this.init();
      this.binds();
    });
  }

  init() {
    this.container = document.querySelector(this.selector);
    this.loginInput = this.container.querySelector("#register_user_login");
    this.passwordInput = this.container.querySelector(
      "#register_user_password"
    );
    this.bornInput = this.container.querySelector("#register_user_born");
    this.button = this.container.querySelector("button");
  }

  binds() {
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.register();
    });
  }

  register() {
    let user = new User(
      this.loginInput.value,
      this.passwordInput.value,
      this.bornInput.value
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
    this.passwordInput.value = "";
    this.bornInput.value = "";
    this.loginInput.value = "";
  }
}
