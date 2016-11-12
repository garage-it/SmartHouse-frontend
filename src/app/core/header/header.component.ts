import { Component, OnInit} from '@angular/core';

import ROUTING from '../../config.routing';

const HEADER_COMPONENT_SELECTOR = 'sh-header';

export const NAVIGATION_ROUTES = [
    { path: `/${ROUTING.DASHBOARD}`, headerName: 'Dashboard', iconImage: './assets/dashboard.svg', main: true},
    { path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg' },
    { path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg' },
    { path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg' },
    { path: `/${ROUTING.REGISTRATION}`, headerName: 'Registration', iconImage: './assets/registration.svg' }
];

@Component({
    selector: HEADER_COMPONENT_SELECTOR,
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    private mainRoute: Object;

    ngOnInit() {
        const routes = NAVIGATION_ROUTES.filter(route => route['main']);
        this.mainRoute = routes && routes.length ? routes[0] : null;
    }

    get mainPageRoute() {
        return this.mainRoute;
    }

    get navigationRoutes() {
        return NAVIGATION_ROUTES;
    }
}
