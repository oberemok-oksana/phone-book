export default class Contacts {
  constructor(selector, contactService, modalWindow) {
    this.selector = selector;
    this.contactService = contactService;
    this.modalWindow = modalWindow;

    this.init();
    this.binds();
  }

  init() {
    this.containerMyContacts = document.querySelector(".my-contacts-list");
    this.container = document.querySelector(".add-contact-form");
    this.findContainer = document.querySelector(".find-contact");
    this.chosenContactInfo = document.querySelector(".chosen-contact");
    this.nameInput = this.container.querySelector("#contact-name");
    this.typeSelect = this.container.querySelector("#options");
    this.valueInput = this.container.querySelector("#contact");
    this.addButton = this.container.querySelector("button");
    this.findButton = this.findContainer.querySelector(".find-btn");
    this.resetButton = this.findContainer.querySelector(".reset-btn");
    this.findSelect = this.findContainer.querySelector("#find-type");
    this.findInput = this.findContainer.querySelector("#serachInput");
  }

  binds() {
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addContact(
        this.nameInput.value,
        this.typeSelect.value,
        this.valueInput.value
      );
    });
    this.loadContacts().then(() => {
      this.showContacts();
    });

    this.containerMyContacts.addEventListener("click", (e) => {
      if (e.target.matches(".my-contacts-list-item")) {
        this.removeActiveClass();
        e.target.classList.add("active-contact");
        const contact = this.contactService.contacts.find((contact) => {
          return contact.id === parseInt(e.target.dataset.id);
        });

        this.chosenContactInfo.innerHTML = "";
        let contactName = document.createElement("div");
        contactName.classList.add("my-contacts-list-item");
        contactName.innerHTML = contact.name;
        let contactType = document.createElement("div");
        contactType.classList.add("my-contacts-list-item");
        contactType.innerHTML = contact.type;
        let contactValue = document.createElement("div");
        contactValue.classList.add("my-contacts-list-item");
        contactValue.innerHTML = contact.value;

        this.chosenContactInfo.append(contactName, contactType, contactValue);
      }
    });

    this.findContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      this.findContact(this.findInput.value, this.findSelect.value);
      this.removeActiveClass();
      this.chosenContactInfo.innerHTML = "";
      this.findInput.value = "";
    });

    this.resetButton.addEventListener("click", () => {
      this.loadContacts().then(() => {
        this.showContacts();
        this.chosenContactInfo.innerHTML = "";
      });
    });
  }

  removeActiveClass() {
    let allChosen = document.querySelectorAll(".active-contact");
    allChosen.forEach((chosen) => chosen.classList.remove("active-contact"));
  }

  showContacts() {
    this.containerMyContacts.innerHTML = "";
    this.contactService.contacts.map((contact) => {
      let person = document.createElement("li");
      person.classList.add("my-contacts-list-item");
      person.dataset.id = contact.id;
      person.innerHTML = contact.name;
      this.containerMyContacts.append(person);
    });
  }

  loadContacts() {
    return this.contactService.getMyContacts();
  }

  addContact(name, type, value) {
    this.contactService.addContact(name, type, value).then(() => {
      if (
        this.nameInput.value === "" ||
        this.typeSelect.value === "" ||
        this.valueInput.value === ""
      ) {
        this.modalWindow.show("Please, fill in all fields. ");
      } else {
        this.modalWindow.show("New contact has been created.");
        this.nameInput.value = "";
        this.typeSelect.value = "phone";
        this.valueInput.value = "";
        this.contactService.getMyContacts().then(() => {
          this.showContacts();
        });
      }
    });
  }

  findContact(name, type) {
    if (this.findInput.value === "") {
      this.modalWindow.show("Please fill in the search field.");
      return;
    }
    let search;
    if (type === "find-by-name") {
      search = { name: name };
    } else {
      search = { value: name };
    }

    return this.contactService.findContact(search).then(() => {
      this.showContacts();
    });
  }
}
