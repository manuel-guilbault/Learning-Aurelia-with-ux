import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, Router, RouteConfig } from 'aurelia-router';

import { Contact } from 'contacts/models/contact';
import { ContactApi } from 'contacts/services/api';

@autoinject()
export class ContactDetails implements RoutableComponentActivate {
  
  public contact: Contact;

  constructor(
    private readonly contactApi: ContactApi,
    private readonly router: Router
  ) {}

  public async activate({ id }: { id: string }, routeConfig: RouteConfig) {
    this.contact = await this.contactApi.getById(parseInt(id));
    routeConfig.navModel.setTitle(this.contact.fullName);
  }

  public async tryDelete() {
    if (confirm('Do you really want to delete this contact?')) {
      await this.contactApi.delete(this.contact.id);
      this.goToList();
    }
  }

  public goToList() {
    this.router.navigateToRoute('contact-list');
  }
}
