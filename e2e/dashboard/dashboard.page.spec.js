var MainPage = require('../main/main.page.js');
var DashboardPage = require('../dashboard/dashboard.page.js');

describe('SmartHouse Dashboard page', () => {
    var abstractPage = new MainPage();
    var dashboardPage = new DashboardPage();

    it('should check page title', () => {
        //dashboardPage.get();
        browser.get(browser.baseUrl);
        expect(abstractPage.dashboardLink.getText()).toEqual('Dashboard');
        abstractPage.dashboardLink.click();
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(dashboardPage.title.getText()).toEqual('Dashboard');
    });
});
