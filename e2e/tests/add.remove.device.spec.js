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
        var id = props.names.newDevice.id,
            type = props.names.newDevice.type,
            desc = props.names.newDevice.desc,
            metr = props.names.newDevice.metrics;

        devicesPageActions.addNewDevice(id, type, desc, metr, false);
        expect(devicesPageActions.isDeviceInTheList(id, type, desc)).toBeTruthy();

    });
  });
