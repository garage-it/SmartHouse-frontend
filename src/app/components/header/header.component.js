import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import style from './header.component.scss';
import template from './header.component.html';

import routes from './../../routes';

const selector = 'sh-header';


@Component({
    selector,
    styles: [style],
    template,
    directives: [RouterLink]
})
export class HeaderComponent {
    constructor() {
        this.routes = routes.filter(route => route.headerName || route.useAsDefault)
          .map(headerRoute => Object.assign(headerRoute, {
              iconImage: `./assets/${headerRoute.name}.png`
          }));
    }

    get mainPageRoute() {
        return {
            path: '/',
            name: 'Dashboard',
            headerName: 'Smart House',
            iconImage: './assets/Index.png'
        };
    }

    get navigationRoutes() {
        return [
            {path: '/dashboard', name: 'Dashboard', headerName: 'Dashboard'},
            {path: '/device-list', name: 'DeviceList', headerName: 'Devices'},
            {path: '/scenarios', name: 'ScenarioList', headerName: 'Scenarios'},
            {path: '/help', name: 'Help', headerName: 'Help'}
        ].map(p=>{
            p.iconImage = `./assets/${ p.name }.png`;
            return p;
        });
    }
}
