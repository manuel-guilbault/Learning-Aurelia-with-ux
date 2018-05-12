import { customElement, bindable } from 'aurelia-framework';

@customElement('group-list')
export class GroupList<TItem> {

  @bindable() public items: TItem[];
  @bindable() public groupBy: (item: TItem) => any;
  @bindable() public orderBy: (item: TItem) => any;
}
