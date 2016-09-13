import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import style from './header.component.scss';
import template from './header.component.html';

const HEADER_COMPONENT_SELECTOR = 'sh-header';

export const NAVIGATION_ROUTES = [
    { path: 'dashboard', headerName: 'Dashboard', iconImage: './assets/dashboard.svg' },
    { path: 'devices', headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: 'scenarios', headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: 'help', headerName: 'Help', iconImage: './assets/help.svg' }
];

@Component({
    selector: HEADER_COMPONENT_SELECTOR,
    styles: [style],
    template,
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {
    get mainPageRoute() {
        return {
            name: 'dashboard',
            headerName: 'Smart House',
            iconImage: './assets/index.png'
        };
    }

    get navigationRoutes() {
        return NAVIGATION_ROUTES;
    }
}
