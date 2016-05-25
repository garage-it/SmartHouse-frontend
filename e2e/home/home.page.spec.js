var HomePage = require('../home/home.page.js');

describe('Home Page Tests', () => {
    var homePage = new HomePage();

    beforeEach(function () {
        browser.ignoreSynchronization = true;
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
