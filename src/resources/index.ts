import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./attributes/blob-src'),
    PLATFORM.moduleName('./attributes/file-drop-target'),
    PLATFORM.moduleName('./attributes/navigate-to'),
    PLATFORM.moduleName('./elements/file-picker'),
    PLATFORM.moduleName('./elements/group-list'),
    PLATFORM.moduleName('./elements/list-editor'),
    PLATFORM.moduleName('./elements/locale-picker'),
    PLATFORM.moduleName('./elements/top-menu'),
    PLATFORM.moduleName('./value-converters/filter-by'),
    PLATFORM.moduleName('./value-converters/group-by'),
    PLATFORM.moduleName('./value-converters/order-by'),
  ]);
}
