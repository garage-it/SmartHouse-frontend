"use strict";
var router_1 = require('@angular/router');
exports.routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', useAsDefault: true },
    {
        path: 'help',
        loadChildren: function () { return require('es6-promise!./help/help.module')('HelpModule'); }
    },
    {
        path: 'dashboard',
        loadChildren: function () { return require('es6-promise!./dashboard/dashboard.module')('DashboardModule'); }
    },
    {
        path: 'devices',
        loadChildren: function () { return require('es6-promise!./devices/devices.module')('DevicesModule'); }
    },
    {
        path: 'scenarios',
        loadChildren: function () { return require('es6-promise!./scenarios/scenarios.module')('ScenariosModule'); }
    }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
