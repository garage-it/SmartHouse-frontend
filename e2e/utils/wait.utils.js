var WaitUtils = function () {

    this.waitFor = function (element) {
        browser.wait(function () {
            if (element != null) {
                return  element.isPresent();
            }
            return false;
        });
    };
};

module.exports = WaitUtils;
