"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var sh_request_options_1 = require('./sh-request-options');
var ShHttpService = (function () {
    function ShHttpService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new sh_request_options_1.ShRequestOptions({ headers: this.headers });
    }
    ShHttpService.prototype.get = function (url, params) {
        return this.http
            .get(url, this.getRequestOptions('Get', url, params))
            .map(this.convertToJson);
    };
    ShHttpService.prototype.post = function (url, body) {
        return this.http
            .post(url, JSON.stringify(body), this.getRequestOptions('Post', url))
            .map(this.convertToJson);
    };
    ShHttpService.prototype.put = function (url, body) {
        return this.http
            .put(url, JSON.stringify(body), this.getRequestOptions('Put', url))
            .map(this.convertToJson);
    };
    ShHttpService.prototype.delete = function (url) {
        return this.http
            .delete(url, this.getRequestOptions('Delete', url))
            .map(this.convertToJson);
    };
    ShHttpService.prototype.setAuthHeader = function (token) {
        this.headers.set('Authorization', "Bearer " + token);
    };
    ShHttpService.prototype.removeAuthHeader = function () {
        this.headers.delete('Authorization');
    };
    ShHttpService.prototype.convertToJson = function (data) {
        return data.json();
    };
    ShHttpService.prototype.getRequestOptions = function (method, url, params) {
        return this.options.merge({
            search: params,
            method: http_1.RequestMethod[method],
            url: url
        });
    };
    ShHttpService = __decorate([
        core_1.Injectable()
    ], ShHttpService);
    return ShHttpService;
}());
exports.ShHttpService = ShHttpService;
