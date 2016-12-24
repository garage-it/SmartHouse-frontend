"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var shared_module_1 = require('../shared/shared.module');
var dashboard_routing_1 = require('./dashboard.routing');
var dashboard_component_1 = require('./dashboard.component');
var sensor_widget_service_1 = require('./shared/sensor-widget/sensor-widget.service');
var dashboard_resolve_service_1 = require('./dashboard-resolve.service');
var dashboard_service_1 = require('./dashboard.service');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var dashboard_declarations_1 = require('./dashboard.declarations');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            id: module.id,
            imports: [shared_module_1.SharedModule, router_1.RouterModule, forms_1.FormsModule, dashboard_routing_1.routing],
            declarations: dashboard_declarations_1.default.slice(),
            exports: [dashboard_component_1.DashboardComponent],
            providers: [sensor_widget_service_1.SensorWidgetService, dashboard_service_1.DashboardService, dashboard_resolve_service_1.DashboardResolveService, ng2_dragula_1.DragulaService]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
