var DashboardPage = function () {
    
    this.title = $('.dashboard');

    this.get = function() {
        browser.get(browser.baseUrl + 'dashboard');
    };
};
module.exports = DashboardPage;
