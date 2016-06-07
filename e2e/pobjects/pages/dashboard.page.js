var DashboardPage = function () {
    
    this.headerName = $('.dashboard_title h2');

    this.get = () => {
        browser.get(browser.baseUrl + 'dashboard');
    };
};
module.exports = DashboardPage;
