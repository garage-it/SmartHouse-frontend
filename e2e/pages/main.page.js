var MainPage = function () {
    
    this.dashboardLink = $('a[href*="dashboard"]');
    this.devicesListLink = $('a[href*="device-list"]');
    this.scenariosListLink = $('a[href*="scenarios"]');
    this.brandLogo = $('a.logo');

    this.get = function () {
        browser.get(browser.baseUrl);
    };
};
module.exports = MainPage;
