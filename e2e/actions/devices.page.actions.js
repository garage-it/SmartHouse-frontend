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

    this.isDeviceInTheList = (id) => {
        waitUtils.waitFor(devicesPage.devicesTable);
        return element(by.cssContainingText('tbody tr td', id))
            .isDisplayed()
            .then(null, function() {
                console.log("\nWARN: No device found with ID: " + id);
                return false;
            });
    };

    this.removeDevice = (id) => {
        waitUtils.waitFor(devicesPage.devicesTable);
        element(by.cssContainingText('tbody tr td', id))
            .element(by.xpath('parent::node()'))
            .element(by.css('button.sensors-list-table__body__row__actions__remove'))
            .click()
            .then(function () {
              //Wait for alert to pop up
              browser.wait(() => {
                  return browser.switchTo().alert().then(
                      () => {return true;},
                      () => {return false;}
                  );
              }, 3000); // Wait timeout

              // Test alert is what you expect
              var popupAlert = browser.switchTo().alert(),
                  alertText = popupAlert.getText();
              expect(alertText).toMatch('Are you sure you want to delete this device?');

              // Close alert
              popupAlert.accept();
          },
              function() {
                console.log("\nWARN: No device removed with ID: " + id);
            });

        waitUtils.waitFor(devicesPage.devicesTable);
        browser.sleep(1000);
    };
};

module.exports = DevicesPageActions;
