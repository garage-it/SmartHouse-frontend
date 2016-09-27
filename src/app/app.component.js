import { Component, ViewEncapsulation } from '@angular/core';

import style from './app.style.scss';
import template from './app.template.html';


export const NAVIGATION_ROUTES = [
    { path: 'dashboard', headerName: 'Dashboard', iconImage: './assets/dashboard.svg', main: true},
    { path: 'devices', headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: 'scenarios', headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: 'help', headerName: 'Help', iconImage: './assets/help.svg' }
];

@Component({
    selector: 'sh-app',
    styles: [style],
    template,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
    }

    getRoutes() {
        return NAVIGATION_ROUTES;
    }

}
