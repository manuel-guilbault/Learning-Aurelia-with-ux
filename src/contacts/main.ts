import { inlineView, PLATFORM } from 'aurelia-framework';
import { ConfiguresRouter, RouterConfiguration } from 'aurelia-router';

@inlineView('<template><router-view></router-view></template>')
export class Contacts implements ConfiguresRouter {

  public configureRouter(config: RouterConfiguration) {
    config.map([
      { route: '', name: 'contacts', moduleId: PLATFORM.moduleName('./components/list'), title: 'contacts.contacts' },
      { route: 'new', name: 'contact-creation', moduleId: PLATFORM.moduleName('./components/creation'), title: 'contacts.newContact' },
      { route: ':id', name: 'contact-details', moduleId: PLATFORM.moduleName('./components/details') },
      { route: ':id/edit', name: 'contact-edition', moduleId: PLATFORM.moduleName('./components/edition') },
      { route: ':id/photo', name: 'contact-photo', moduleId: PLATFORM.moduleName('./components/photo') },
    ]);
  }
}
