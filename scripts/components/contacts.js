class Contacts {
  constructor(selector, contactService, modalWindow) {
    this.selector = selector;
    this.contactService = contactService;
    this.modalWindow = modalWindow;

    this.init();
    this.binds();
  }

  init() {
    this.containerMyContacts = $(".my-contacts-list");
    this.container = $(".add-contact-form");
    this.findContainer = $(".find-contact");
    this.chosenContactInfo = $(".chosen-contact");
    this.nameInput = this.container.find("#contact-name");
    this.typeSelect = this.container.find("#options");
    this.valueInput = this.container.find("#contact");
    this.addButton = this.container.find("button");
    this.findButton = this.findContainer.find(".find-btn");
    this.resetButton = this.findContainer.find(".reset-btn");
    this.findSelect = this.findContainer.find("#find-type");
    this.findInput = this.findContainer.find("#serachInput");
  }

  binds() {
    this.container.on("submit", (e) => {
      e.preventDefault();
      this.addContact(
        this.nameInput.val(),
        this.typeSelect.val(),
        this.valueInput.val()
      );
    });
    this.loadContacts().then(() => {
      this.showContacts();
    });
    //todo refuctor later
    this.containerMyContacts.on("click", (e) => {
      if (e.target.matches(".my-contacts-list-item")) {
        this.removeActiveClass();
        e.target.addClass("active-contact");
        const contact = this.contactService.contacts.find((contact) => {
          return contact.id === parseInt(e.target.dataset.id);
        });

        this.chosenContactInfo.text("");
        let contactName = $("div");
        contactName.addClass("my-contacts-list-item");
        contactName.text(contact.name);
        let contactType = $("div");
        contactType.addClass("my-contacts-list-item");
        contactType.text(contact.type);
        let contactValue = $("div");
        contactValue.addClass("my-contacts-list-item");
        contactValue.text(contact.value);

        this.chosenContactInfo.append(contactName, contactType, contactValue);
      }
    });

    this.findContainer.on("submit", (e) => {
      e.preventDefault();
      this.findContact(this.findInput.val(), this.findSelect.val());
      this.removeActiveClass();
      this.chosenContactInfo.text("");
      this.findInput.val("");
    });

    this.resetButton.on("click", () => {
      this.loadContacts().then(() => {
        this.showContacts();
        this.chosenContactInfo.text("");
      });
    });
  }

  removeActiveClass() {
    let allChosen = $(".active-contact");
    // allChosen.forEach((chosen) => chosen.classList.remove("active-contact"));
    allChosen.removeClass("active-contact");
  }

  showContacts() {
    this.containerMyContacts.text("");
    this.contactService.contacts.map((contact) => {
      let person = $("li");
      person.addClass("my-contacts-list-item");
      // person.dataset.id = contact.id;
      person.data("id", contact.id);
      person.text(contact.name);
      this.containerMyContacts.append(person);
    });
  }

  loadContacts() {
    return this.contactService.getMyContacts();
  }

  addContact(name, type, value) {
    this.contactService.addContact(name, type, value).then(() => {
      if (
        // this.nameInput.value === "" ||
        // this.typeSelect.value === "" ||
        // this.valueInput.value === ""
        this.nameInput.val() === "" ||
        this.typeSelect.val() === "" ||
        this.valueInput.val() === ""
      ) {
        this.modalWindow.show("Please, fill in all fields.... ");
      } else {
        this.modalWindow.show("New contact has been created.");
        this.nameInput.val("");
        this.typeSelect.val("phone");
        this.valueInput.val("");
        this.contactService.getMyContacts().then(() => {
          this.showContacts();
        });
      }
    });
  }

  findContact(name, type) {
    if (this.findInput.val() === "") {
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
