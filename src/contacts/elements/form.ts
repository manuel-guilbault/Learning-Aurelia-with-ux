import { customElement, bindable } from 'aurelia-framework';
import { Contact } from 'contacts/models/contact';

@customElement('contact-form')
export class ContactForm {

  @bindable() public contact: Contact;
}
