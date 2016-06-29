var DevicesPage = require('../pobjects/pages/devices.page.js');
var NavWidget = require('../pobjects/widgets/nav.widget.js');

describe('Devices Page Test', () => {
    var devicesPage = new DevicesPage();
    var navWidget = new NavWidget();

    beforeEach(() => {
        devicesPage.get();
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
        expect(devicesPage.addNewDeviceButton.getText()).toEqual('ADD NEW DEVICE');
    });
});
