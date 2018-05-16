import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, RoutableComponentDeactivate, Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactCreation implements RoutableComponentActivate, RoutableComponentDeactivate {
  
  private readonly validationController: ValidationController;
  public contact: Contact;
  private localeChangedSubscription: Subscription;

  constructor(
    validationControllerFactory: ValidationControllerFactory,
    private readonly contactApi: ContactApi,
    private readonly router: Router,
    private readonly eventAggregator: EventAggregator
  ) {
    this.validationController = validationControllerFactory.createForCurrentScope();
  }

  public async activate() {
    this.contact = new Contact();

    this.localeChangedSubscription = this.eventAggregator.subscribe('i18n:locale:changed', () => {
      this.validationController.revalidateErrors();
    });
  }

  public deactivate() {
    if (this.localeChangedSubscription) {
      this.localeChangedSubscription.dispose();
      this.localeChangedSubscription = null;
    }
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
