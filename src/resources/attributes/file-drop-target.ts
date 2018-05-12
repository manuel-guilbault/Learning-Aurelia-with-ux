import { customAttribute, bindingMode, autoinject, ComponentAttached, ComponentDetached } from 'aurelia-framework';

@customAttribute('file-drop-target', bindingMode.twoWay)
@autoinject()
export class FileDropTarget implements ComponentAttached, ComponentDetached {

  public value: FileList;

  constructor(private readonly element: Element) {}

  public attached() {
    this.element.addEventListener('dragover', this.onDragOver);
    this.element.addEventListener('drop', this.onDrop);
    this.element.addEventListener('dragend', this.onDragEnd);
  }

  public detached() {
    this.element.removeEventListener('dragend', this.onDragEnd);
    this.element.removeEventListener('drop', this.onDrop);
    this.element.removeEventListener('dragover', this.onDragOver);
  }

  private readonly onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  private readonly onDrop = (e: DragEvent) => {
    e.preventDefault();
    this.value = e.dataTransfer.files;
  };

  private readonly onDragEnd = (e: DragEvent) => {
    e.dataTransfer.clearData();
  };
}
