import "../style.css";

let userService = new UserServices();
let contactService = new ContactServices();
let modalWindow = new ModalWindow(".modal-window");
let registerForm = new RegisterForm(".register-form", userService, modalWindow);

let loginForm = new LoginForm(
  ".login-form",
  userService,
  contactService,
  modalWindow
);
let exitBtn = new ExitBtn();
