var DevicesPage = require('../pobjects/pages/devices.page.js');
var AddNewDevicePage = require('../pobjects/pages/add.new.device.page.js');

var DevicesPageActions = function () {
    var devicesPage = new DevicesPage();
    var addNewDevicePage = new AddNewDevicePage();

    this.addNewDevice = (name, type, description, switcher) => {
        devicesPage.addNewDeviceButton.click().then(() => {
            addNewDevicePage.deviceNameInput.sendKeys(name);
            addNewDevicePage.deviceTypeInput.sendKeys(type);
            addNewDevicePage.deviceDescriptionInput.sendKeys(description);
            if (switcher) {
              addNewDevicePage.switcherLabel.click();
            }
            addNewDevicePage.saveDeviceButton.click();
        })
    };
};
module.exports = DevicesPageActions;
