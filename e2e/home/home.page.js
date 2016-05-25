var HomePage = function () {
    
    this.greetingHeader = $('main.container h1');
    this.greetingParagraph = $('main.container p');

    this.get = function () {
        browser.get('home');
    };
};
module.exports = HomePage;
