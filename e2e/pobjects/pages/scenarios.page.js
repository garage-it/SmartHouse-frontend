var ScenariosPage = function () {

    this.headerName = $('#page-title');

    this.get = () => {
        browser.get(browser.baseUrl + 'scenarios');
    };
};
module.exports = ScenariosPage;
