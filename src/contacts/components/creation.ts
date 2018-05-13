import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactCreation implements RoutableComponentActivate {
  
  private readonly validationController: ValidationController;
  public contact: Contact;

  constructor(
    validationControllerFactory: ValidationControllerFactory,
    private readonly contactApi: ContactApi,
    private readonly router: Router
  ) {
    this.validationController = validationControllerFactory.createForCurrentScope();
  }

  public async activate() {
    this.contact = new Contact();
  }

  public async create() {
    const result = await this.validationController.validate();
    if (result.valid) {
      await this.contactApi.create(this.contact);
      this.goToList();
    }
  }

  public goToList() {
    this.router.navigateToRoute('contacts');
  }
}
