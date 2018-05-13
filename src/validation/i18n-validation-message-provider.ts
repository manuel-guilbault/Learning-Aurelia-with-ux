import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ValidationMessageParser, ValidationMessageProvider } from 'aurelia-validation';

@autoinject()
export class I18nValidationMessageProvider extends ValidationMessageProvider {

  public options = {
    messageKeyPrefix: 'validation.messages.',
    propertyNameKeyPrefix: 'validation.properties.'
  };

  constructor(
    private readonly messageParser: ValidationMessageParser,
    private readonly i18n: I18N
  ) {
    super(messageParser);
  }

  public getMessage(key) {
    let translationKey = key.includes('.') || key.includes(':') ? key : `${this.options.messageKeyPrefix}${key}`;
    let translation = this.i18n.tr(translationKey);
    if (translation !== translationKey) {
      return this.messageParser.parse(translation);
    }

    return super.getMessage(key);
  }

  getDisplayName(propertyName) {
    let translationKey = `${this.options.propertyNameKeyPrefix}${propertyName}`;
    let translation = this.i18n.tr(translationKey);
    if (translation !== translationKey) {
      return translation;
    }

    return super.getDisplayName(propertyName);
  }
}
