var DevicesPage = require('../pobjects/pages/devices.page.js');
var NavWidget = require('../pobjects/widgets/nav.widget.js');
var DevicesPageActions = require('../actions/devices.page.actions.js');

describe('Devices Page Test', () => {
    var devicesPage = new DevicesPage();
    var navWidget = new NavWidget();
    var devicesPageActions = new DevicesPageActions();

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

    it('should Add New Device', () => {
        let deviceName = 'MyLamp1';
        devicesPageActions.addNewDevice(deviceName,'Light device','Light level');
        expect(devicesPage.deiviceFound(deviceName)).toBe(true);
    });

    it('should emulate sending message from added device', () => {
        let deviceName = 'MyLamp1';
        browser.MQTT.publish(deviceName, '700');
        // expect(devicesPage.deiviceFound(deviceName)).toBe(true);

    });
});
