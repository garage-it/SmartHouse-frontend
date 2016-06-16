var AddNewDevicePage = function () {

    this.backToListLink = $('a.back-link');
    this.pageHeader = $('.page-header h1');

    this.deviceNameLabel = $('.sensor-detail__id label');
    this.deviceNameInput = $('#sensor-detail__id');

    this.deviceTypeLabel = $('.sensor-detail__type label');
    this.deviceTypeInput = $('#sensor-detail__type');

    this.deviceDescriptionLabel = $('.sensor-detail__description label');
    this.deviceDescriptionInput = $('#sensor-detail__description');

    this.switcherCheckbox = $('#sensor-detail__executor');
    this.switcherLabel = $('label[for="sensor-detail__executor"]');

    this.saveDeviceButton = $("button[type='submit']");

    this.get = () => {
        browser.get(browser.baseUrl + 'sensors/create');
    };
};
module.exports = AddNewDevicePage;
