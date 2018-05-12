import { ConfiguresRouter, RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App implements ConfiguresRouter {

  public router: Router;
  
  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Contacts';
    config.map([
      { route: '', name: 'contact-list', moduleId: PLATFORM.moduleName('contacts/pages/list') },
      { route: 'new', name: 'contact-creation', moduleId: PLATFORM.moduleName('contacts/pages/creation') },
      { route: ':id', name: 'contact-details', moduleId: PLATFORM.moduleName('contacts/pages/details') },
      { route: ':id/edit', name: 'contact-edition', moduleId: PLATFORM.moduleName('contacts/pages/edition') },
      { route: ':id/photo', name: 'contact-photo', moduleId: PLATFORM.moduleName('contacts/pages/photo') },
    ]);
  }
}
