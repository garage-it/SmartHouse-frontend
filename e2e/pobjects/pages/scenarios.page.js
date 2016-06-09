var ScenariosPage = function () {

    this.pageHeader = $('#page-title');
    this.createNewScenarioButton = $("button[href='#/sensors/create']");

    this.get = () => {
        browser.get(browser.baseUrl + 'scenarios');
    };
};
module.exports = ScenariosPage;
