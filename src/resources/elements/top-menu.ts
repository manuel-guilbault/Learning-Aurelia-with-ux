import { autoinject, customElement } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject()
@customElement('top-menu')
export class TopMenu {

  constructor(public readonly router: Router) {}
}
