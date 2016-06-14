var DashboardPage = function () {
    
    this.pageHeader = $('.dashboard_title h2');
    this.sensorWidgets = $$('.sensor-widget');

    this.get = () => {
        browser.get(browser.baseUrl + 'dashboard');
    };
};
module.exports = DashboardPage;
