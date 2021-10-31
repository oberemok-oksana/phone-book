class ContactServices {
  constructor() {
    this.contacts = [];
  }

  addContact(name, type, value) {
    return fetch(ContactServices.BASE_URL + "add", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        type: type,
        value: value,
      }),
    }).then((response) => response.json());
  }

  getMyContacts() {
    return fetch(ContactServices.BASE_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.contacts = json.contacts.map((contact) => Contact.create(contact));
      });
  }

  findContact(search) {
    return fetch(ContactServices.BASE_URL + "find", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((json) => {
        this.contacts = json.contacts.map((contact) => Contact.create(contact));
      });
  }
}

ContactServices.BASE_URL = "http://mag-contacts-api.herokuapp.com/contacts/";
