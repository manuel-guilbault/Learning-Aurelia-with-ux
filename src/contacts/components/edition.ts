import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, RoutableComponentDeactivate, Router, RouteConfig } from 'aurelia-router';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactEdition implements RoutableComponentActivate, RoutableComponentDeactivate {
  
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

  public async activate({ id }: { id: string }, routeConfig: RouteConfig) {
    this.contact = await this.contactApi.getById(parseInt(id));
    routeConfig.navModel.setTitle(this.contact.fullName);

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
