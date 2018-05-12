import { customAttribute, autoinject, bindable, ComponentAttached, ComponentDetached } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@customAttribute('navigate-to')
@autoinject()
export class NavigateTo implements ComponentAttached, ComponentDetached {
  
  @bindable({ primaryProperty: true }) public route: string;
  @bindable() public params: any;

  constructor(
    private readonly element: Element,
    private readonly router: Router
  ) {}

  public attached() {
    this.element.addEventListener('click', this.onClick);
  }

  public detached() {
    this.element.removeEventListener('click', this.onClick);
  }

  private readonly onClick = (e: Event) => {
    this.router.navigateToRoute(this.route, this.params);
  };
}
