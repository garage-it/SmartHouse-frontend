var AddNewDevicePage = require('../pobjects/pages/add.new.device.page.js');
var DevicesPage = require('../pobjects/pages/devices.page.js');
var Properties = require('../properties.js');

describe('Add and Remove device Test', () => {
    var addNewDevicePage = new AddNewDevicePage();
    var devicesPage = new DevicesPage();
    var props = new Properties();

    beforeEach(() => {
        addNewDevicePage.get();
    });

    it('should check adding of device', () => {
        devicesPage.addNewDevice(props.names.newDevice.testId, props.names.newDevice.testType, props.names.newDevice.testDesc);
        expect(devicesPage.pageHeader.getText()).toEqual(props.names.headers.devices);
    });
  };
