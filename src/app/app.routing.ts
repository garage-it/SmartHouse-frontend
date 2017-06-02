import { RouterModule } from '@angular/router';

import { ScreenComponent } from './core/screen/screen.component';
import { GuestGuard, LoggedInGuard } from './core/profile/profile.guards';
import { ProfileResolver } from './core/profile/profile.resolver';

import ROUTING from './config.routing';

export const routes = {
    path: ROUTING.BASE,
    component: ScreenComponent,
    resolve: {
        resolved: ProfileResolver
    },
    children: [
        {
            path: ROUTING.HOME,
            loadChildren: './home/home.module#HomeModule'
        },
        {
            path: ROUTING.HELP,
            loadChildren: './help/help.module#HelpModule'
        },
        {
            path: ROUTING.SCENARIOS,
            canActivate: [ LoggedInGuard ],
            loadChildren: './scenarios/scenarios.module#ScenariosModule'
        },
        {
            path: ROUTING.LOGIN,
            canActivate: [ GuestGuard ],
            loadChildren: './login/login.module#LoginModule'
        },
        {
            path: ROUTING.LOGOUT,
            canActivate: [ LoggedInGuard ],
            loadChildren: './logout/logout.module#LogoutModule'
        },
        {
            path: ROUTING.REGISTRATION,
            canActivate: [ GuestGuard ],
            loadChildren: './registration/registration.module#RegistrationModule'
        },
        {
            path: ROUTING.STATISTIC,
            canActivate: [ LoggedInGuard ],
            loadChildren: './statistic/statistic.module#StatisticModule'
        },
        {
            path: ROUTING.SETTINGS,
            canActivate: [ LoggedInGuard ],
            loadChildren: './settings/settings.module#SettingsModule'
        },
        {
            path: '**',
            redirectTo: ROUTING.HOME,
            pathMatch: 'full'
        }
    ]
};

export const routing = RouterModule.forRoot([routes]);
