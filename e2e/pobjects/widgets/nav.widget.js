var NavWidget = function () {

    this.dashboardLink = $('#nav-mobile a[href="#/"]');
    this.devicesLink = $('#nav-mobile a[href="#/device-list"]');
    this.scenariosLink = $('#nav-mobile a[href="#/scenarios"]');
    this.brandLogo = $('a.logo');

};
module.exports = NavWidget;
