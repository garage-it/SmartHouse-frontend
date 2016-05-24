describe('SmartHouse homepage', () => {
    var linkToDashboard = $('a[href="#/dashboard"]');
    var titleOnDashboard = $('.dashboard');

    it('should check page title', () => {
        browser.get(browser.baseUrl);
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(linkToDashboard.getText()).toEqual('Dashboard');
        linkToDashboard.click();
        expect(titleOnDashboard.getText()).toEqual('Dashboard');
    });
});
