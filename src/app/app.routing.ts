import { RouterModule } from '@angular/router';
import ROUTING from './config.routing';

export const routes = [
    { path: ROUTING.BASE, redirectTo: ROUTING.DASHBOARD, pathMatch: 'full', useAsDefault: true },
    {
        path: ROUTING.HELP,
        loadChildren: () => require('es6-promise!./help/help.module')('HelpModule')
    },
    {
        path: ROUTING.DASHBOARD,
        loadChildren: () => require('es6-promise!./dashboard/dashboard.module')('DashboardModule')
    },
    {
        path: ROUTING.DEVICES,
        loadChildren: () => require('es6-promise!./devices/devices.module')('DevicesModule')
    },
    {
        path: ROUTING.SCENARIOS,
        loadChildren: () => require('es6-promise!./scenarios/scenarios.module')('ScenariosModule')
    }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
