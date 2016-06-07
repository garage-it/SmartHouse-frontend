var ScenariosPage = function () {

    this.headerName = $('scenario-list h2');

    this.get = () => {
        browser.get(browser.baseUrl + 'scenarios');
    };
};
module.exports = ScenariosPage;
