import { RouterModule } from '@angular/router';
import { GuestGuard, LoggedInGuard } from './shared/profile/profile.guards';
import { ProfileResolver } from './shared/profile/profile.resolver';
import { ScreenComponent } from './core/screen/screen.component';

export const routes = [
    {
        path: '',
        component: ScreenComponent,
        resolve: {
            resolved: ProfileResolver
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
                useAsDefault: true
            },
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
                canActivate: [ LoggedInGuard ],
                loadChildren: () => require('es6-promise!./devices/devices.module')('DevicesModule')
            },
            {
                path: 'scenarios',
                canActivate: [ LoggedInGuard ],
                loadChildren: () => require('es6-promise!./scenarios/scenarios.module')('ScenariosModule')
            },
            {
                path: 'login',
                canActivate: [ GuestGuard ],
                loadChildren: () => require('es6-promise!./login/login.module')('LoginModule')
            }
        ]
    },
];

export const routing = RouterModule.forRoot(routes);
