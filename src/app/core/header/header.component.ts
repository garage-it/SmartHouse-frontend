import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';

import ROUTING from '../../config.routing';

export const NAVIGATION_ROUTES = [
    { path: `/${ROUTING.DASHBOARD}`, headerName: 'Dashboard', iconImage: './assets/dashboard.svg', main: true},
    { path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: `/${ROUTING.STATISTIC}`, headerName: 'Statistic', iconImage: './assets/statistic.svg', authRequired: true },
    { path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg' },
    { path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg' },
    { path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg' },
    { path: `/${ROUTING.REGISTRATION}`, headerName: 'Registration', iconImage: './assets/registration.svg' }
];

@Component({
    selector: 'sh-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    private mainRoute: Object;

    constructor(private profile: ProfileService) {}

    ngOnInit() {
        const routes = NAVIGATION_ROUTES.filter(route => route['main']);
        this.mainRoute = routes && routes.length ? routes[0] : null;
    }

    isOptionHidden(route) {
        return route.authRequired && this.profile.isGuest();
    }

    get mainPageRoute() {
        return this.mainRoute;
    }

    get navigationRoutes() {
        return NAVIGATION_ROUTES;
    }
}
