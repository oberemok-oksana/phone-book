class ExitBtn {
  constructor() {
    this.init();
    this.binds();
  }

  init() {
    this.exitButton = $(".exit");
    this.unauthorizedScreen = $(".unauthorized-screen");
    this.authorizedScreen = $(".authorized-screen");
  }

  binds() {
    this.exitButton.on("click", () => {
      window.token = null;
      this.unauthorizedScreen.show();
      this.authorizedScreen.hide();
      this.exitButton.hide();
    });
  }
}
