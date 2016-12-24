"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var style = require('./dashboard.style.scss');
var template = require('./dashboard.template.html');
var Rx_1 = require('rxjs/Rx');
var DashboardComponent = (function () {
    function DashboardComponent(sensorWidgetService, route) {
        this.sensorWidgetService = sensorWidgetService;
        this.route = route;
        this.sensorWidgetService = sensorWidgetService;
        this.route = route;
        this.widgets = [];
        this.sensorWidgets = [];
        this.executorSensorWidgets = [];
        this.servoSensorWidgets = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var widgetsSource = this.route.data
            .flatMap(function (_a) {
            var widgets = _a.widgets;
            return Rx_1.Observable.from(widgets.devices);
        });
        widgetsSource
            .subscribe(function (widget) { return _this.widgets.push(widget); });
        widgetsSource
            .filter(function (widget) { return widget.device.executor === true; })
            .subscribe(function (widget) { return _this.executorSensorWidgets.push(widget); });
        widgetsSource
            .filter(function (widget) { return widget.device.servo === true; })
            .subscribe(function (widget) { return _this.servoSensorWidgets.push(widget); });
        widgetsSource
            .filter(function (widget) { return !(widget.device.executor || widget.device.servo); })
            .subscribe(function (widget) { return _this.sensorWidgets.push(widget); });
        this.sensorWidgetService
            .subscribe(false, function (data) { return _this.onDeviceAddEvent(data); });
    };
    DashboardComponent.prototype.onDeviceAddEvent = function (data) {
        if (data.event === 'device-add') {
            this.widgets.push({
                device: data.data,
                hidden: false
            });
        }
    };
    DashboardComponent.prototype.isDashboardEmpty = function () {
        return !this.widgets.length;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'sh-dashboard',
            template: template,
            styles: [style]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
