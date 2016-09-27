import 'core-js';

// RxJS
import 'rxjs';

// Zone
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';

// Jasmine Helpers
import './jasmine/create-spy-component';

// Angular Testing
import * as testing from '@angular/core/testing';
import * as browser from '@angular/platform-browser/testing';

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
