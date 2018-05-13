/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import { I18N } from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend';
import { AppRouter } from 'aurelia-router';
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/components'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/icons'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), async (i18n: I18N) => {
      i18n.i18next.use(Backend);

      await i18n.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json', 
        },
        lng : 'en',
        fallbackLng : 'en',
        debug : environment.debug
      });
      
      const router = aurelia.container.get(AppRouter) as AppRouter;
      router.transformTitle = (title: string) => i18n.tr(title);
    })
    .feature(PLATFORM.moduleName('resources/index'))
    .feature(PLATFORM.moduleName('validation/index'))
    .feature(PLATFORM.moduleName('contacts/index'));

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
