var DevicesPage = function () {

    this.pageHeader = $('#page-title');
    this.addNewDeviceButton = $("button[href='#/sensors/create']");

    this.get = () => {
        browser.get(browser.baseUrl + 'device-list');
    };
};
module.exports = DevicesPage;
