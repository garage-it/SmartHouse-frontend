var DashboardPage = require('../pages/dashboard.page.js');

describe('Dashboard Page Test', () => {
    var dashboardPage = new DashboardPage();

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        dashboardPage.get();
    });

    it('should check page title', () => {
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(dashboardPage.title.getText()).toEqual('Dashboard');
    });
});
