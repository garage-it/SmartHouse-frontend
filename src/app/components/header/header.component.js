import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import style from './header.component.scss';
import template from './header.component.html';

const HEADER_COMPONENT_SELECTOR = 'sh-header';
export const NAVIGATION_ROUTES = [
    { name: 'Dashboard', headerName: 'Dashboard', iconImage: './assets/Dashboard.png' },
    { name: 'DeviceList', headerName: 'Devices', iconImage: './assets/DeviceList.png' },
    { name: 'ScenarioList', headerName: 'Scenarios', iconImage: './assets/ScenarioList.png' },
    { name: 'Help', headerName: 'Help', iconImage: './assets/Help.png' }
];

@Component({
    selector: HEADER_COMPONENT_SELECTOR,
    styles: [style],
    template,
    directives: [RouterLink]
})
export class HeaderComponent {
    get mainPageRoute() {
        return {
            name: 'Dashboard',
            headerName: 'Smart House',
            iconImage: './assets/Dashboard.png'
        };
    }

    get navigationRoutes() {
        return NAVIGATION_ROUTES;
    }
}
