import { RouterModule } from '@angular/router';

export const routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', useAsDefault: true },
    {
        path: 'help',
        loadChildren: () => require('es6-promise!./help/help.module')('HelpModule')
    },
    {
        path: 'dashboard',
        loadChildren: () => require('es6-promise!./dashboard/dashboard.module')('DashboardModule')
    },
    {
        path: 'devices',
        loadChildren: () => require('es6-promise!./devices/devices.module')('DevicesModule')
    },
    {
        path: 'scenarios',
        loadChildren: () => require('es6-promise!./scenarios/scenarios.module')('ScenariosModule')
    },
    {
        path: 'registration',
        loadChildren: () => require('es6-promise!./registration/registration.module')('RegistrationModule')
    }
];

export const routing = RouterModule.forRoot(routes);
