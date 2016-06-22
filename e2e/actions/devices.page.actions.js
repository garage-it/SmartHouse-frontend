var WaitUtils = require('../utils/wait.utils');
var DevicesPage = require('../pobjects/pages/devices.page');
var AddNewDevicePage = require('../pobjects/pages/add.new.device.page');

var DevicesPageActions = function () {
    var devicesPage = new DevicesPage();
    var addNewDevicePage = new AddNewDevicePage();
    var waitUtils = new WaitUtils();

    this.addNewDevice = (name, type, description, switcher) => {
        devicesPage.addNewDeviceButton.click().then(() => {
            waitUtils.waitFor(addNewDevicePage.deviceNameInput);
            addNewDevicePage.deviceNameInput.sendKeys(name);
            waitUtils.waitFor(addNewDevicePage.deviceTypeInput);
            addNewDevicePage.deviceTypeInput.sendKeys(type);
            waitUtils.waitFor(addNewDevicePage.deviceDescriptionInput);
            addNewDevicePage.deviceDescriptionInput.sendKeys(description);
            if (switcher != null && switcher) {
              addNewDevicePage.switcherLabel.click();
            }
            addNewDevicePage.saveDeviceButton.click();
        });
        waitUtils.waitFor(devicesPage.pageHeader);
    };
};

module.exports = DevicesPageActions;
