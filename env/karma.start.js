Error.stackTraceLimit = Infinity;

require('core-js');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
    browser.TEST_BROWSER_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_APPLICATION_PROVIDERS);

Object.assign(global, testing);

//var config = require('./env.config');
var appContext = require.context('../src', true, /\.test\.ts/);

appContext.keys().forEach(appContext);
