class ModalWindow {
  constructor(selector) {
    this.selector = selector;
    document.addEventListener("DOMContentLoaded", () => {
      this.container = document.querySelector(selector);
      this.okBtn = this.container.querySelector(".modal-window__btn");
      this.body = this.container.querySelector(".modal-window__body");
      this.bind();
    });
  }

  bind() {
    this.okBtn.addEventListener("click", () => this.hide());
  }

  hide() {
    this.container.style.display = "";
    this.onClose();
  }

  show(message, onClose) {
    this.onClose = onClose || (() => {});
    this.body.innerHTML = message;
    this.container.style.display = "flex";
  }
}
