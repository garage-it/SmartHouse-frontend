import { Component, OnInit} from '@angular/core';

const style = require('./header.component.scss');
const template = require('./header.component.html');

const HEADER_COMPONENT_SELECTOR = 'sh-header';

export const NAVIGATION_ROUTES = [
    { path: 'dashboard', headerName: 'Dashboard', iconImage: './assets/dashboard.svg', main: true},
    { path: 'devices', headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: 'scenarios', headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: 'help', headerName: 'Help', iconImage: './assets/help.svg' }
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
