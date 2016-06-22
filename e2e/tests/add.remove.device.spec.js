var DevicesPage = require('../pobjects/pages/devices.page.js');
var DevicesPageActions = require('../actions/devices.page.actions.js');
var Properties = require('../properties.js');

describe('Add and Remove device Test', () => {
    var devicesPage = new DevicesPage();
    var devicesPageActions = new DevicesPageActions();
    var props = new Properties();

    beforeEach(() => {
        devicesPage.get();
    });

    it('should check adding of device', () => {
        devicesPageActions.addNewDevice(props.names.newDevice.id, props.names.newDevice.type, props.names.newDevice.desc, false);
        expect(devicesPage.pageHeader.getText()).toEqual(props.names.headers.devices);
    });
  });
