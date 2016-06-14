var NavWidget = function () {

    this.dashboardLink = $('a[href="#/dashboard"]');
    this.devicesLink = $('a[href="#/device-list"]');
    this.scenariosLink = $('a[href="#/scenarios"]');
    this.brandLogo = $('a.logo');

};
module.exports = NavWidget;
