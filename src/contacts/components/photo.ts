import { autoinject, NewInstance } from 'aurelia-framework';
import { RoutableComponentActivate, RoutableComponentDeactivate, Router, RouteConfig } from 'aurelia-router';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactPhoto implements RoutableComponentActivate, RoutableComponentDeactivate {

  private readonly validationController: ValidationController;
  public contact: Contact;
  public photo: FileList = null;
  public photoErrors = [];
  private localeChangedSubscription: Subscription;

  constructor(
    validationControllerFactory: ValidationControllerFactory,
    private readonly contactApi: ContactApi,
    private readonly router: Router,
    private readonly eventAggregator: EventAggregator
  ) {
    this.validationController = validationControllerFactory.createForCurrentScope();

    ValidationRules
      .ensure<ContactPhoto, any>(x => x.photo)
        .satisfiesRule('notEmpty')
          .withMessageKey('contacts.validation.singleFile')
        .satisfiesRule('maxFileSize', 1024 * 1024 * 2)
        .satisfiesRule('fileExtension', ['.jpg', '.png'])
      .on(this);
  }

  public get areFilesValid() {
    return !this.photoErrors || this.photoErrors.length === 0;
  }

  public get preview() {
    return this.photo && this.photo.length > 0 && this.areFilesValid
      ? this.photo.item(0)
      : null;
  }

  public async activate({ id }: { id: string }, config: RouteConfig) {
    this.contact = await this.contactApi.getById(parseInt(id));
    config.navModel.setTitle(this.contact.fullName);

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

  public async save() {
    const result = await this.validationController.validate();
    if (result.valid) {
      await this.contactApi.updatePhoto(this.contact.id, this.photo.item(0));
      this.goToDetails();
    }
  }

  public goToDetails() {
    this.router.navigateToRoute('contact-details', { id: this.contact.id });
  }
}
