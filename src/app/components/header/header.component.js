import {Component} from 'angular2/core';
import {Router, RouterLink} from 'angular2/router';

import style from './header.component.scss';
import template from './header.component.html';

import routes from './../../routes';

const HEADER_COMPONENT_SELECTOR = 'sh-header';
export const INITIAL_ROUTE = 'Dashboard';
export const INDEX_ROUTE = 'Index';

@Component({
    selector: HEADER_COMPONENT_SELECTOR,
    styles: [style],
    template,
    directives: [RouterLink]
})
export class HeaderComponent {
    constructor(router: Router) {
        this.router = router;
        this.routes = routes.filter(route => route.headerName || route.useAsDefault)
          .map(headerRoute => Object.assign(headerRoute, {
              iconImage: `./assets/${headerRoute.name}.png`
          }));
    }

    get mainPageRoute() {
        return this.routes.find(route => route.headerName && route.useAsDefault);
    }

    initialRouteActivated(route) {
        return route.name === INITIAL_ROUTE
            && this.router.isRouteActive(this.router.generate([INDEX_ROUTE]));
    }

    get navigationRoutes() {
        return this.routes.filter(route => route.headerName && !route.useAsDefault);
    }
}
