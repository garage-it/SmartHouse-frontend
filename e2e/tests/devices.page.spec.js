var DevicesPage = require('../pobjects/pages/devices.page.js'),
    NavWidget = require('../pobjects/widgets/nav.widget.js'),
    WaitUtils = require('../utils/wait.utils');

describe('Devices Page Test', () => {
    var devicesPage = new DevicesPage(),
        navWidget = new NavWidget(),
        waitUtils = new WaitUtils();

    beforeEach(() => {
        devicesPage.get();
        browser.refresh();
    });

    it('should check page title and header name', () => {
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(devicesPage.pageHeader.getText()).toEqual('Devices');
    });

    it('should check page brand logo', () => {
        expect(navWidget.brandLogo.getText()).toEqual('Smart House');
    });

    it('should check page links names', () => {
        expect(navWidget.dashboardLink.getText()).toEqual('Dashboard');
        expect(navWidget.devicesLink.getText()).toEqual('Devices');
        expect(navWidget.scenariosLink.getText()).toEqual('Scenarios');
    });

    it('should check Add New Device button is present with proper name', () => {
        waitUtils.waitFor(devicesPage.addNewDeviceButton);
        expect(devicesPage.addNewDeviceButton.getText()).toEqual('ADD NEW DEVICE');
    });
});
