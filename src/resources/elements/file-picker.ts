import { autoinject, bindable, bindingMode, DOM, ComponentBind } from 'aurelia-framework';

let nextId = 1;

function generateId() {
  return `--file-picker-${nextId++}`;
}

@autoinject()
export class FilePicker implements ComponentBind {

  @bindable() accept = '';
  @bindable() multiple = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) files;

  private input: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor(private readonly element: Element) {}

  public bind() {
    let id;
    if (this.element.hasAttribute('id')) {
      id = this.element.getAttribute('id');
      this.element.removeAttribute('id');
    } else {
      id = generateId();
    }

    this.input.setAttribute('id', id);
    this.label.setAttribute('for', id);
  }

  public filesChanged() {
    this.element.dispatchEvent(DOM.createCustomEvent('blur'));
  }
}
