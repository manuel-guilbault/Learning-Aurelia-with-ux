import './rules';
import { AureliaUXFormRenderer } from './aurelia-ux-form-renderer'; 

export function configure(config) {
  config.container.registerHandler('ux-form', container => container.get(AureliaUXFormRenderer));
}
