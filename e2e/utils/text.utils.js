var TextUtils = function () {

    this.typeString = function (element, stringValue) {
        stringValue.split('').forEach(function (char) {
            element.sendKeys(char);
        });
    };
};

module.exports = TextUtils;
