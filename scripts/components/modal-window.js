class ModalWindow {
  constructor(selector) {
    this.selector = selector;
    $(() => {
      this.container = $(selector);
      this.okBtn = this.container.find(".modal-window__btn");
      this.body = this.container.find(".modal-window__body");
      this.bind();
    });
  }

  bind() {
    this.okBtn.on("click", () => this.hide());
  }

  hide() {
    this.container.hide();
    this.onClose();
  }

  show(message, onClose) {
    this.onClose = onClose || (() => {});
    this.body.text(message);
    this.container.css("display", "flex");
  }
}
