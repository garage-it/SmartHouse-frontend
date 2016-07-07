var WaitUtils = function () {

    this.waitFor = (element) => {
        browser.wait(() => {return  element.isPresent()}, 10000);
    };
};

module.exports = WaitUtils;
