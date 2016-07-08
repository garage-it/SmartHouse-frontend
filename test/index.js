import 'core-js';

// RxJS
import 'rxjs';

// Zone
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';

// Jasmine Helpers
import './jasmine/create-spy-component';

// Angular Testing
import * as testing from 'angular2/testing';
import * as browser from 'angular2/platform/testing/browser';

// Zone
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';

testing.setBaseTestProviders(
    browser.TEST_BROWSER_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_APPLICATION_PROVIDERS);

Object.assign(global, testing, {
    ENV_PUBLIC_CONFIG: {}
});

// Add specs
const appContext = require.context('../src', true, /\.test\.js/);

appContext.keys().forEach(appContext);
