export default class ExitBtn {
  constructor() {
    this.init();
    this.binds();
  }

  init() {
    this.exitButton = document.querySelector(".exit");
    this.unauthorizedScreen = document.querySelector(".unauthorized-screen");
    this.authorizedScreen = document.querySelector(".authorized-screen");
  }

  binds() {
    this.exitButton.addEventListener("click", () => {
      window.token = null;
      this.unauthorizedScreen.style.display = "block";
      this.authorizedScreen.style.display = "none";
      this.exitButton.style.display = "none";
    });
  }
}
