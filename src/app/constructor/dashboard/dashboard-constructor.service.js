"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DashboardConstructorService = (function () {
    function DashboardConstructorService(http, httpUtils) {
        this.http = http;
        this.httpUtils = httpUtils;
    }
    DashboardConstructorService.prototype.getWidgets = function () {
        var _this = this;
        return this.http.get('/dashboard')
            .catch(function (error) {
            return _this.httpUtils.extractErrorMessage(error);
        });
    };
    DashboardConstructorService.prototype.saveDashboard = function (devices) {
        return this.http.put('/dashboard', { devices: devices });
    };
    DashboardConstructorService = __decorate([
        core_1.Injectable()
    ], DashboardConstructorService);
    return DashboardConstructorService;
}());
exports.DashboardConstructorService = DashboardConstructorService;
