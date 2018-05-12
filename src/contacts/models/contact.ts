import { ValidationRules } from 'aurelia-validation';

import { PhoneNumber } from './phone-number';
import { EmailAddress } from './email-address';
import { Address } from './address';
import { SocialProfile } from './social-profile';

export class Contact {

  static fromObject(src) {
    const contact = Object.assign(new Contact(), src) as Contact;
    if (src.birthday) {
      contact.birthday = new Date(src.birthday);
    }
    contact.phoneNumbers = (src.phoneNumbers || []).map(PhoneNumber.fromObject);
    contact.emailAddresses = (src.emailAddresses || []).map(EmailAddress.fromObject);
    contact.addresses = (src.addresses || []).map(Address.fromObject);
    contact.socialProfiles = (src.socialProfiles || []).map(SocialProfile.fromObject);
    return contact;
  }

  constructor() {
    ValidationRules
      .ensure('firstName')
        .maxLength(100)
      .ensure('lastName')
        .maxLength(100)
      .ensure('company')
        .maxLength(100)
      .ensure('birthday')
        .satisfiesRule('date')
      .ensure('note')
        .maxLength(2000)
      .on(this);
  }

  public id?: number;
  public firstName = '';
  public lastName = '';
  public company = '';
  public birthday: Date = null;
  public note = '';
  public phoneNumbers: PhoneNumber[] = [];
  public emailAddresses: EmailAddress[] = [];
  public addresses: Address[] = [];
  public socialProfiles: SocialProfile[] = [];

  public get isPerson() {
    return this.firstName || this.lastName;
  }

  public get fullName() {
    const fullName = this.isPerson ? `${this.firstName} ${this.lastName}` : this.company;
    return fullName || '';
  }

  public get firstLetter() {
    const name = this.lastName || this.firstName || this.company;
    return name ? name[0].toUpperCase() : '?';
  }

  public addPhoneNumber() {
    this.phoneNumbers.push(new PhoneNumber());
  }

  public addEmailAddress() {
    this.emailAddresses.push(new EmailAddress());
  }

  public addAddress() {
    this.addresses.push(new Address());
  }

  public addSocialProfile() {
    this.socialProfiles.push(new SocialProfile());
  }
}
