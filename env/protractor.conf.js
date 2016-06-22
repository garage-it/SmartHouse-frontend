'use strict';

require('babel-register');

const mqttApi = require('../e2e/mqtt-api');

const URL = 'https://garage-it-smart-house-qa.herokuapp.com/#/';

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: '../e2e/tests/*spec.js',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: false,
        includeStackTrace: true
    },

    baseUrl: URL,
    useAllAngular2AppRoots: true,

    onPrepare() {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().setSize(1920, 1080);
        browser.driver.manage().window().maximize();
        browser.MQTT = mqttApi;
        browser.MQTT.init();
        browser.wait(() => {
            browser.get(URL);
            return browser.isElementPresent(By.css('a.logo'));
        }, 5000);
    }

};
