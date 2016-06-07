var NavWidget = require('../pobjects/widgets/nav.widget.js');
var DashboardPage = require('../pobjects/pages/dashboard.page.js');
var DevicesPage = require('../pobjects/pages/devices.page.js');
var ScenariosPage = require('../pobjects/pages/scenarios.page.js');

describe('Navigation Test', () => {
    var navWidget = new NavWidget();
    var dashboardPage = new DashboardPage();
    var devicesPage = new DevicesPage();
    var scenariosPage = new ScenariosPage();

    beforeEach(() => {
        browser.get(browser.baseUrl);
    });

    it('should check Dashboard link navigation', () => {
        navWidget.dashboardLink.click();
        expect(dashboardPage.headerName.getText()).toEqual('Dashboard');
    });

    it('should check Devices link navigation', () => {
        navWidget.devicesLink.click();
        expect(devicesPage.headerName.getText()).toEqual('Devices');
    });

    it('should check Scenarios link navigation', () => {
        navWidget.scenariosLink.click();
        expect(scenariosPage.headerName.getText()).toEqual('Scenario list');
    });
});
