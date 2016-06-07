var NavWidget = require('../pobjects/widgets/nav.widget.js');
var DashboardPage = require('../pobjects/pages/dashboard.page.js');

describe('Navigation Test', () => {
    var navWidget = new NavWidget();
    var dashboardPage = new DashboardPage();

    beforeEach(() => {
        browser.get(browser.baseUrl);
    });

    it('should check page navigation', () => {
        navWidget.dashboardLink.click();
        expect(dashboardPage.headerName.getText()).toEqual('Dashboard');
    });
});
