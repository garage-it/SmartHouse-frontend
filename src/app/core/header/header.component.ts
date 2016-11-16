import { Component, OnInit } from '@angular/core';

import ROUTING from '../../config.routing';

const style = require('./header.component.scss');
const template = require('./header.component.html');

const HEADER_COMPONENT_SELECTOR = 'sh-header';


export const NAVIGATION_ROUTES = [
    { path: `/${ROUTING.DASHBOARD}`, headerName: 'Dashboard', iconImage: './assets/dashboard.svg', main: true },
    { path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg', isLoggedIn: true },
    { path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png', isLoggedIn: true },
    { path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg', isLoggedIn: false },
    { path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg', isLoggedIn: false },
    { path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg', isLoggedIn: true },
    { path: `/${ROUTING.REGISTRATION}`, headerName: 'Registration', iconImage: './assets/registration.svg', isLoggedIn: false }
];

@Component({
    selector: HEADER_COMPONENT_SELECTOR,
    styles: [style],
    template
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
