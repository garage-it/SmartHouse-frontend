import {Component} from '@angular/core';

import style from './header.component.scss';
import template from './header.component.html';

const HEADER_COMPONENT_SELECTOR = 'sh-header';

@Component({
    module: module.id,
    selector: HEADER_COMPONENT_SELECTOR,
    styles: [style],
    template,
    inputs: ['routes']
})
export class HeaderComponent {

    mainRoute;

    ngOnInit() {
        const routes = this.routes.filter(route => route.main);
        this.mainRoute = routes.length ? routes[0] : null;
    }

    get mainPageRoute() {
        return this.mainRoute;
    }

    get navigationRoutes() {
        return this.routes;
    }
}
