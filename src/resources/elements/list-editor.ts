import { customElement, bindable } from 'aurelia-framework';

@customElement('list-editor')
export class ListEditor<TItem> {

  @bindable() public items: TItem[] = [];
  @bindable() public addItem: () => void;
}
