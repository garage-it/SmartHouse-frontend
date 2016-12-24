"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var ShHttpUtilsService = (function () {
    function ShHttpUtilsService() {
    }
    ShHttpUtilsService.prototype.extractErrorMessage = function (error) {
        var errorMesssage;
        if (error instanceof http_1.Response) {
            var errorBody = error.json() || '';
            errorMesssage = errorBody.message || 'Unknown error';
        }
        else {
            errorMesssage = 'Unknown error';
        }
        return Rx_1.Observable.throw(errorMesssage);
    };
    ShHttpUtilsService = __decorate([
        core_1.Injectable()
    ], ShHttpUtilsService);
    return ShHttpUtilsService;
}());
exports.ShHttpUtilsService = ShHttpUtilsService;
