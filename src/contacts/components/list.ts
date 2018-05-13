import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate } from 'aurelia-router';
import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactList implements RoutableComponentActivate {
  
  public readonly contacts: Contact[] = [];

  constructor(
    private readonly contactApi: ContactApi
  ) {}

  public async activate() {
    const contacts = await this.contactApi.getAll();
    this.contacts.splice(0, this.contacts.length, ...contacts);
  }
}
