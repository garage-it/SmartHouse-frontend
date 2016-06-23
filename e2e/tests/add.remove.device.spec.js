var DevicesPage = require('../pobjects/pages/devices.page.js'),
    DevicesPageActions = require('../actions/devices.page.actions.js'),
    Properties = require('../properties.js');

describe('Add and Remove device Test', () => {
    var devicesPage = new DevicesPage(),
        devicesPageActions = new DevicesPageActions(),
        props = new Properties(),
        id = props.names.newDevice.id,
        type = props.names.newDevice.type,
        description = props.names.newDevice.description,
        metr = props.names.newDevice.metrics;

    beforeAll(() => {
        devicesPage.get();
        devicesPageActions.removeDevice(id);
    });

    it('should check adding and removing of device', () => {
        devicesPageActions.addNewDevice(id, type, description, metr, false);
        expect(devicesPageActions.isDeviceInTheList(id)).toBeTruthy();
        devicesPageActions.removeDevice(id);
        expect(devicesPageActions.isDeviceInTheList(id)).toBeFalsy();
    });

  });
