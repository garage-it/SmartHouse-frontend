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
              iconImage: `./partials/${headerRoute.name}.png`
          }));
    }

    get mainPageRoute() {
        return this.routes.find(route => route.headerName && route.useAsDefault);
    }

    get navigationRoutes() {
        return this.routes.filter(route => route.headerName && !route.useAsDefault);
    }
}
