var WaitUtils = require('../utils/wait.utils');
var TextUtils = require('../utils/text.utils');
var DevicesPage = require('../pobjects/pages/devices.page');
var AddNewDevicePage = require('../pobjects/pages/add.new.device.page');

var DevicesPageActions = function () {
    var devicesPage = new DevicesPage();
    var addNewDevicePage = new AddNewDevicePage();
    var waitUtils = new WaitUtils();
    var textUtils = new TextUtils();

    this.addNewDevice = (name, type, description, metrics, switcher) => {
        devicesPage.addNewDeviceButton.click().then(() => {
            waitUtils.waitFor(addNewDevicePage.deviceNameInput);

            textUtils.typeString(addNewDevicePage.deviceNameInput, name);
            textUtils.typeString(addNewDevicePage.deviceTypeInput, type);
            textUtils.typeString(addNewDevicePage.deviceDescriptionInput, description);
            textUtils.typeString(addNewDevicePage.deviceMetricsInput, metrics);

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
