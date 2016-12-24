"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./dashboard.component');
var dashboard_resolve_service_1 = require('./dashboard-resolve.service');
var dashboard_editor_component_1 = require('./dashboard-editor/dashboard-editor.component');
exports.routes = [
    { path: '', component: dashboard_component_1.DashboardComponent, resolve: { widgets: dashboard_resolve_service_1.DashboardResolveService } },
    { path: 'editor', component: dashboard_editor_component_1.DashboardEditorComponent }
];
exports.routing = router_1.RouterModule.forChild(exports.routes);
