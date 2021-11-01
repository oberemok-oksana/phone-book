export default class Contact {
  constructor(id, name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.id = id;
  }

  static create(contact) {
    return new Contact(contact.id, contact.name, contact.type, contact.value);
  }
}
