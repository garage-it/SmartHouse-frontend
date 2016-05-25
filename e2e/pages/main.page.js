var MainPage = function () {
    
    this.dashboardLink = $('a[href="#/dashboard"]');
    this.deviceListLink = $('a[href="#/device-list"]');
    this.scenarioListLink = $('a[href="#/scenarios"]');
    this.brandLogo = $('a.brand-logo');

    this.get = function () {
        browser.get(browser.baseUrl);
    };
};
module.exports = MainPage;
