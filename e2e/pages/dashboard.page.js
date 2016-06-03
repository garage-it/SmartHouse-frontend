var DashboardPage = function () {
    
    this.title = $('.dashboard_title h2');

    this.get = function() {
        browser.get(browser.baseUrl + 'dashboard');
    };
};
module.exports = DashboardPage;
