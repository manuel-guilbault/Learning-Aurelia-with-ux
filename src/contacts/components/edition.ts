import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, Router, RouteConfig } from 'aurelia-router';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactEdition implements RoutableComponentActivate {
  
  private readonly validationController: ValidationController;
  public contact: Contact;

  constructor(
    validationControllerFactory: ValidationControllerFactory,
    private readonly contactApi: ContactApi,
    private readonly router: Router
  ) {
    this.validationController = validationControllerFactory.createForCurrentScope();
  }

  public async activate({ id }: { id: string }, routeConfig: RouteConfig) {
    this.contact = await this.contactApi.getById(parseInt(id));
    routeConfig.navModel.setTitle(this.contact.fullName);
  }

  public async update() {
    const result = await this.validationController.validate();
    if (result.valid) {
      await this.contactApi.update(this.contact);
      this.goToDetails();
    }
  }

  public goToDetails() {
    this.router.navigateToRoute('contact-details', { id: this.contact.id });
  }
}
