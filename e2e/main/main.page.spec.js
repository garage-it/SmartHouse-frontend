var MainPage = require('../main/main.page.js');

describe('Main Page Tests', () => {
    var mainPage = new MainPage();

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
        //mainPage.get();
    });

    it('should check page brand logo', () => {
        expect(mainPage.brandLogo.getText()).toEqual('Smart House');
    });

    it('should check page links', () => {
        expect(mainPage.dashboardLink.getText()).toEqual('Dashboard');
        expect(mainPage.deviceListLink.getText()).toEqual('Device List');
        expect(mainPage.scenarioListLink.getText()).toEqual('Scenario List');
    });
});
