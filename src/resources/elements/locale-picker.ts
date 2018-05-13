import { autoinject, customElement, bindable } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';

@autoinject()
@customElement('locale-picker')
export class LocalePicker {

  @bindable() selectedLocale: string;
  @bindable() locales = ['en', 'fr'];

  public isChangingLocale = false;

  constructor(
    private readonly i18n: I18N
  ) {
    this.selectedLocale = this.i18n.getLocale();
  }

  public async selectedLocaleChanged() {
    this.isChangingLocale = true;
    await this.i18n.setLocale(this.selectedLocale)
    this.isChangingLocale = false;
  }
}
