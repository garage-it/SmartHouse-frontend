describe('SmartHouse homepage', () => {

    it('should check page title', () => {
        browser.get(browser.baseUrl);
        expect(browser.getTitle()).toEqual('Smart Home');
    });

    it('should check page brand logo', () => {
        browser.get(browser.baseUrl);
        expect($('a.brand-logo').getText()).toEqual('Smart House');
    });

    it('should check page greetings', () => {
        browser.get(browser.baseUrl);
        expect($('main.container h1').getText()).toEqual('Home');
        expect($('main.container p').getText()).toEqual('Greetings at the Smart House project');
    });

    it('should check page links', () => {
        browser.get(browser.baseUrl);
        expect($('a[href="#/dashboard"]').getText()).toEqual('Dashboard');
        expect($('a[href="#/device-list"]').getText()).toEqual('Device List');
        expect($('a[href="#/scenarios"]').getText()).toEqual('Scenario List');
    });

});
