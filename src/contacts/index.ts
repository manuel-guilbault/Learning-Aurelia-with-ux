import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';

import environment from 'environment';
import { ContactApi } from './services/api';

export function configure(config: FrameworkConfiguration) {
  const router = config.container.get(Router) as Router;
  router.addRoute({
    route: 'contacts',
    name: 'contacts',
    moduleId: PLATFORM.moduleName('contacts/main'),
    nav: true,
    title: 'contacts.contacts'
  });

  const httpClient = config.container.invoke(HttpClient).configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(environment.contactsUrl);
  });
  config.container.registerInstance(ContactApi, new ContactApi(httpClient));
}
