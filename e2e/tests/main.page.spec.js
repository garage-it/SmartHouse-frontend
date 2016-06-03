var MainPage = require('../pages/main.page.js');

describe('Main Page Test', () => {
    var mainPage = new MainPage();

    beforeEach(function () {
        mainPage.get();
    });

    it('should check page brand logo', () => {
        expect(mainPage.brandLogo.getText()).toEqual('Smart House');
    });

    it('should check page links', () => {
        expect(mainPage.dashboardLink.getText()).toEqual('Dashboard');
        expect(mainPage.devicesListLink.getText()).toEqual('Devices');
        expect(mainPage.scenariosListLink.getText()).toEqual('Scenarios');
    });
});
