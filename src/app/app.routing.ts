import { RouterModule } from '@angular/router';

import { ScreenComponent } from './core/screen/screen.component';
import { GuestGuard, LoggedInGuard } from './core/profile/profile.guards';
import { ProfileResolver } from './core/profile/profile.resolver';

import ROUTING from './config.routing';

export const routes = [
    {
        path: ROUTING.BASE,
        component: ScreenComponent,
        resolve: {
            resolved: ProfileResolver
        },
        children: [
            {
                path: '',
                redirectTo: ROUTING.DASHBOARD,
                pathMatch: 'full',
                useAsDefault: true
            },
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
                canActivate: [ LoggedInGuard ],
                loadChildren: () => require('es6-promise!./devices/devices.module')('DevicesModule')
            },
            {
                path: ROUTING.SCENARIOS,
                canActivate: [ LoggedInGuard ],
                loadChildren: () => require('es6-promise!./scenarios/scenarios.module')('ScenariosModule')
            },
            {
                path: ROUTING.LOGIN,
                canActivate: [ GuestGuard ],
                loadChildren: () => require('es6-promise!./login/login.module')('LoginModule')
            },
            {
                path: ROUTING.LOGOUT,
                canActivate: [ LoggedInGuard ],
                loadChildren: () => require('es6-promise!./logout/logout.module')('LogoutModule')
            },
            {
                path: ROUTING.REGISTRATION,
                canActivate: [ GuestGuard ],
                loadChildren: () => require('es6-promise!./registration/registration.module')('RegistrationModule')
            }
        ]
    },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
