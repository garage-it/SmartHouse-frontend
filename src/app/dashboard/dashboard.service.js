"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DashboardService = (function () {
    function DashboardService(http) {
        this.http = http;
        this.http = http;
    }
    DashboardService.prototype.getWidgets = function () {
        return this.http.get('/dashboard');
    };
    DashboardService.prototype.applyChanges = function (devices) {
        return this.http.put('/dashboard', { devices: devices });
    };
    DashboardService.prototype.compareWidgetsLists = function (initial, updated) {
        var _loop_1 = function(i, l) {
            var properties = Object.keys(updated[i]);
            var different = properties.some(function (prop) { return initial[i][prop] !== updated[i][prop]; });
            if (different) {
                return { value: false };
            }
        };
        for (var i = 0, l = updated.length; i < l; i++) {
            var state_1 = _loop_1(i, l);
            if (typeof state_1 === "object") return state_1.value;
        }
        return true;
    };
    DashboardService = __decorate([
        core_1.Injectable()
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
