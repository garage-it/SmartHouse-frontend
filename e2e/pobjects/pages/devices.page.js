var DevicesPage = function () {

    this.headerName = $('#page-title');

    this.get = () => {
        browser.get(browser.baseUrl + 'device-list');
    };
};
module.exports = DevicesPage;
