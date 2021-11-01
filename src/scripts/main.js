import "../style.scss";
import UserServices from "./services/user-services";
import ContactServices from "./services/contact-services";
import ModalWindow from "./components/modal-window";
import RegisterForm from "./components/register-form";
import LoginForm from "./components/login-form";
import ExitBtn from "./components/exit-btn";

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
