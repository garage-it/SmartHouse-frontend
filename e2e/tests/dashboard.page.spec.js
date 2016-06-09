var DashboardPage = require('../pobjects/pages/dashboard.page.js');
var NavWidget = require('../pobjects/widgets/nav.widget.js');

describe('Dashboard Page Test', () => {
    var dashboardPage = new DashboardPage();
    var navWidget = new NavWidget();

    beforeEach(() => {
        dashboardPage.get();
    });

    it('should check page header name', () => {
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(dashboardPage.pageHeader.getText()).toEqual('Dashboard');
    });

    it('should check page brand logo', () => {
        expect(navWidget.brandLogo.getText()).toEqual('Smart House');
    });

    it('should check page links names', () => {
        expect(navWidget.dashboardLink.getText()).toEqual('Dashboard');
        expect(navWidget.devicesLink.getText()).toEqual('Devices');
        expect(navWidget.scenariosLink.getText()).toEqual('Scenarios');
    });
});
