import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework'; 
import { ValidationMessageProvider } from 'aurelia-validation';

import './rules';
import { AureliaUXFormRenderer } from './aurelia-ux-form-renderer';
import { I18nValidationMessageProvider } from './i18n-validation-message-provider';

export function configure(config: FrameworkConfiguration) {
  config.plugin(PLATFORM.moduleName('aurelia-validation'));
  config.container.registerHandler('ux-form', c => c.get(AureliaUXFormRenderer));
  config.container.registerSingleton(ValidationMessageProvider, I18nValidationMessageProvider);
}
