"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var ShRequestOptions = (function (_super) {
    __extends(ShRequestOptions, _super);
    function ShRequestOptions(options) {
        _super.call(this);
        this.options = options;
    }
    ShRequestOptions.prototype.merge = function (options) {
        var opts = {};
        Object.assign(opts, this.options, options, {
            url: ENV_PUBLIC_CONFIG.backEndUrl + "/api" + options.url
        });
        return _super.prototype.merge.call(this, opts);
    };
    return ShRequestOptions;
}(http_1.BaseRequestOptions));
exports.ShRequestOptions = ShRequestOptions;
