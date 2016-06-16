var AddNewDevicePage = require('../pobjects/pages/add.new.device.page.js');
var DevicesPage = require('../pobjects/pages/devices.page.js');
var NavWidget = require('../pobjects/widgets/nav.widget.js');
var Properties = require('../properties.js');

describe('New Device Page Test', () => {
    var addNewDevicePage = new AddNewDevicePage();
    var devicesPage = new DevicesPage();
    var navWidget = new NavWidget();
    var props = new Properties();

    beforeEach(() => {
        addNewDevicePage.get();
    });

    it('should check page title and header name', () => {
        expect(browser.getTitle()).toEqual(props.names.title);
        expect(addNewDevicePage.pageHeader.getText()).toEqual(props.names.headers.newDevice);
    });

    it('should check page brand logo', () => {
        expect(navWidget.brandLogo.getText()).toEqual(props.names.logo);
    });

    it('should check page links names', () => {
        expect(navWidget.dashboardLink.getText()).toEqual(props.names.links.dashboard);
        expect(navWidget.devicesLink.getText()).toEqual(props.names.links.devices);
        expect(navWidget.scenariosLink.getText()).toEqual(props.names.links.scenarios);
    });

    it('should check all required elements are present with proper names', () => {
        expect(addNewDevicePage.backToListLink.getText()).toContain(props.names.links.backToList);

        expect(addNewDevicePage.deviceNameLabel.getText()).toEqual("Device name");
        expect(addNewDevicePage.deviceNameInput.getAttribute('placeholder')).toEqual("Enter descriptive name");

        expect(addNewDevicePage.deviceTypeLabel.getText()).toEqual("Type");
        expect(addNewDevicePage.deviceTypeInput.getAttribute('placeholder')).toEqual("Enter type");

        expect(addNewDevicePage.deviceDescriptionLabel.getText()).toEqual("Description");
        expect(addNewDevicePage.deviceDescriptionInput.getAttribute('placeholder')).toEqual("Enter description");

        expect(addNewDevicePage.switcherCheckbox.isSelected()).toBe(false);
        expect(addNewDevicePage.switcherLabel.getText()).toEqual("Switcher");

        expect(addNewDevicePage.saveDeviceButton.getText()).toEqual("SAVE DEVICE");
    });

    it('should check Back to list link', () => {
        addNewDevicePage.backToListLink.click().then(() => {
          expect(devicesPage.pageHeader.getText()).toEqual(props.names.headers.devices);
        });
    });
});
