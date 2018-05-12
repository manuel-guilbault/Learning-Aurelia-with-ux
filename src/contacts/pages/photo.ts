import { autoinject, NewInstance } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactPhoto {

  private readonly validationController: ValidationController;
  public contact: Contact;
  public photo: FileList = null;
  public photoErrors = [];

  constructor(
    validationControllerFactory: ValidationControllerFactory,
    private readonly contactApi: ContactApi,
    private readonly router: Router
  ) {
    this.validationController = validationControllerFactory.createForCurrentScope();

    ValidationRules
      .ensure<ContactPhoto, any>(x => x.photo)
        .satisfiesRule('notEmpty')
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
