var MainPage = require('../main/main.page.js');
var DashboardPage = require('../dashboard/dashboard.page.js');

describe('Dashboard Page Tests', () => {
    var abstractPage = new MainPage();
    var dashboardPage = new DashboardPage();

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        dashboardPage.get();
    });

    it('should check page title', () => {
        expect(abstractPage.dashboardLink.getText()).toEqual('Dashboard');
        abstractPage.dashboardLink.click();
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(dashboardPage.title.getText()).toEqual('Dashboard');
    });
});
