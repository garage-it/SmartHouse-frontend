var MainPage = require('../main/main.page.js');

describe('SmartHouse Main page', () => {
    var mainPage = new MainPage();

    it('should check page brand logo', () => {
        //mainPage.get();
        browser.get(browser.baseUrl);
        expect(mainPage.brandLogo.getText()).toEqual('Smart House');
    });

    it('should check page links', () => {
        //mainPage.get();
        browser.get(browser.baseUrl);
        expect(mainPage.dashboardLink.getText()).toEqual('Dashboard');
        expect(mainPage.deviceListLink.getText()).toEqual('Device List');
        expect(mainPage.scenarioListLink.getText()).toEqual('Scenario List');
    });
});
