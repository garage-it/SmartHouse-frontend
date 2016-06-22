var DevicesPage = function () {

    this.pageHeader = $('#page-title');
    this.addNewDeviceButton = $("button[href='#/sensors/create']");
    this.lastDeviceName = $('tbody > tr:last-child > td').innerHTML;

    this.get = () => {
        browser.get(browser.baseUrl + 'device-list');
    };

    this.deiviceFound = (deviceName) => {
        return this.lastDeviceName == deviceName;
    }
};
module.exports = DevicesPage;
