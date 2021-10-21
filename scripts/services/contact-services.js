class ContactServices {
  constructor() {
    this.contacts = [];
  }

  addContact(name, type, value) {
    return $.ajax({
      url: ContactServices.BASE_URL + "add",
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: name,
        type: type,
        value: value,
      }),
    });
  }

  getMyContacts() {
    return $.ajax({
      url: ContactServices.BASE_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((json) => {
      this.contacts = json.contacts.map((contact) => Contact.create(contact));
    });
  }

  findContact(search) {
    return $.ajax({
      url: ContactServices.BASE_URL + "find",
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(search),
    }).then((json) => {
      this.contacts = json.contacts.map((contact) => Contact.create(contact));
    });
  }
}

ContactServices.BASE_URL = "http://mag-contacts-api.herokuapp.com/contacts/";
