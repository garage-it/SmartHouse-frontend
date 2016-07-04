import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import style from './header.component.scss';
import template from './header.component.html';

const HEADER_COMPONENT_SELECTOR = 'sh-header';
// TODO change name to path
export const NAVIGATION_ROUTES = [
    { name: 'dashboard', headerName: 'Dashboard', iconImage: './assets/Dashboard.png' },
    { name: 'devices', headerName: 'Devices', iconImage: './assets/DeviceList.png' },
    { name: 'scenarios', headerName: 'Scenarios', iconImage: './assets/ScenarioList.png' },
    { name: 'help', headerName: 'Help', iconImage: './assets/Help.png' }
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
            name: 'Dashboard',
            headerName: 'Smart House',
            iconImage: './assets/Index.png'
        };
    }

    get navigationRoutes() {
        return NAVIGATION_ROUTES;
    }
}
