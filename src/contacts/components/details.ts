import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, Router, RouteConfig } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactDetails implements RoutableComponentActivate {
  
  public contact: Contact;

  constructor(
    private readonly contactApi: ContactApi,
    private readonly router: Router,
    private readonly i18n: I18N
  ) {}

  public async activate({ id }: { id: string }, routeConfig: RouteConfig) {
    this.contact = await this.contactApi.getById(parseInt(id));
    routeConfig.navModel.setTitle(this.contact.fullName);
  }

  public async tryDelete() {
    if (confirm(this.i18n.tr('contacts.confirmDelete'))) {
      await this.contactApi.delete(this.contact.id);
      this.goToList();
    }
  }

  public goToList() {
    this.router.navigateToRoute('contacts');
  }
}
