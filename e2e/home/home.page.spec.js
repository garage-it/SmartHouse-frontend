var MainPage = require('../main/main.page.js');
var HomePage = require('../home/home.page.js');

describe('Home Page Tests', () => {
    var mainPage = new MainPage();
    var homePage = new HomePage();

    it('should check page title', () => {
        //homePage.get();
        browser.get(browser.baseUrl);
        expect(browser.getTitle()).toEqual('Smart Home');
    });

    it('should check page greetings', () => {
        //homePage.get();
        browser.get(browser.baseUrl);
        expect(homePage.greetingHeader.getText()).toEqual('Home');
        expect(homePage.greetingParagraph.getText()).toEqual('Greetings at the Smart House project');
    });
});
