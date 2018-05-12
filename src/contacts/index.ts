import { FrameworkConfiguration } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

import environment from 'environment';
import { ContactApi } from './services/api';

export function configure(config: FrameworkConfiguration) {
  const httpClient = config.container.invoke(HttpClient).configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(environment.contactsUrl);
  });
  config.container.registerInstance(ContactApi, new ContactApi(httpClient));
}
