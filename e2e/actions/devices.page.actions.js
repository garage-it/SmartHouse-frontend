var WaitUtils = require('../utils/wait.utils');
var DevicesPage = require('../pobjects/pages/devices.page');
var AddNewDevicePage = require('../pobjects/pages/add.new.device.page');

var DevicesPageActions = function () {
    var devicesPage = new DevicesPage();
    var addNewDevicePage = new AddNewDevicePage();
    var waitUtils = new WaitUtils();

    this.addNewDevice = (name, type, description, metrics, switcher) => {
        devicesPage.addNewDeviceButton.click().then(() => {
            waitUtils.waitFor(addNewDevicePage.deviceNameInput);
            addNewDevicePage.deviceNameInput.sendKeys(name);
            addNewDevicePage.deviceTypeInput.sendKeys(type);
            addNewDevicePage.deviceDescriptionInput.sendKeys(description);
            addNewDevicePage.deviceMetricsInput.sendKeys(metrics);

            if (switcher != null && switcher) {
              addNewDevicePage.switcherLabel.click();
            }
            addNewDevicePage.saveDeviceButton.click();
        });
        waitUtils.waitFor(devicesPage.pageHeader);
    };
    
    this.isDeviceInTheList = (id, type, description) => {
        var devices = devicesPage.devicesList.all(by.cssContainingText('td', id));

        if (devices.length) {
            devices.forEach(function (elem) {

                var n = elem.findElements(by.cssContainingText('td', id));
                var t = elem.findElements(by.cssContainingText('td', type));
                var d = elem.findElements(by.cssContainingText('td', description));

                if (n.length && t.length && d.length) {
                    return true;
                }
            })
        }
        return false;
    }
};

module.exports = DevicesPageActions;
