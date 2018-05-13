import { PLATFORM } from 'aurelia-framework';
import { ConfiguresRouter, RouterConfiguration, Router } from 'aurelia-router';

function findDefaultRoute(router: Router) {
  return router.navigation[0].relativeHref;
}

export class App implements ConfiguresRouter {

  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Learning Aurelia';
    config.map([
      { route: '', redirect: findDefaultRoute(router) },
    ]);
    config.mapUnknownRoutes(PLATFORM.moduleName('not-found'));
  }
}
