import { inject, ComponentUnbind } from 'aurelia-framework';

@inject(Element)
export class BlobSrcCustomAttribute implements ComponentUnbind {

  private objectUrl: string = null;

  constructor(private readonly element: HTMLImageElement) {}

  private disposeObjectUrl() {
    if (this.objectUrl && URL) {
      this.element.src = '';
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  public valueChanged(value) {
    this.disposeObjectUrl();

    if (Blob && URL && value instanceof Blob) {
      this.objectUrl = URL.createObjectURL(value);
      this.element.src = this.objectUrl;
    }
  }

  public unbind() {
    this.disposeObjectUrl();
  }
}
