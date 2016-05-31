var HomePage = require('../pages/home.page.js');

describe('Home Page Test', () => {
    var homePage = new HomePage();

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().setSize(1920, 1080);
        browser.driver.manage().window().maximize();
        homePage.get();
    });

    it('should check page title', () => {
        expect(browser.getTitle()).toEqual('Smart Home');
    });

    it('should check page greetings', () => {
        expect(homePage.greetingHeader.getText()).toEqual('Home');
        expect(homePage.greetingParagraph.getText()).toEqual('Greetings at the Smart House project');
    });
});
