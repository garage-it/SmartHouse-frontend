var DashboardPage = function () {
    
    this.title = $('.dashboard');

    this.get = function() {
        browser.get('dashboard');
    };
};
module.exports = DashboardPage;
