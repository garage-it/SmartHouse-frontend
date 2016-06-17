import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

const style = require('./header.component.scss');
const template = require('./header.component.html');

// TODO: fix type resolution
const routes = require('./../../routes').default;

const selector = 'sh-header';


@Component({
    selector,
    styles: [style],
    template,
    directives: [RouterLink]
})
export class HeaderComponent {
    routes: any;

    constructor() {
        this.routes = routes.filter(route => route.headerName || route.useAsDefault)
          .map(headerRoute => Object.assign(headerRoute, {
              iconImage: `./assets/${headerRoute.name}.png`
          }));
    }

    get mainPageRoute() {
        return this.routes.find(route => route.headerName && route.useAsDefault);
    }

    get navigationRoutes() {
        return this.routes.filter(route => route.headerName && !route.useAsDefault);
    }
}
