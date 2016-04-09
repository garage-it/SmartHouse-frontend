import 'core-js';

import * as testing from 'angular2/testing';
import * as browser from 'angular2/platform/testing/browser';

testing.setBaseTestProviders(
    browser.TEST_BROWSER_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_APPLICATION_PROVIDERS);

const appContext = require.context('../src', true, /\.test\.js/);

appContext.keys().forEach(appContext);
