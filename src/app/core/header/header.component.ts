import { Component, Input, OnInit} from '@angular/core';

const style = require('./header.component.scss');
const template = require('./header.component.html');

const HEADER_COMPONENT_SELECTOR = 'sh-header';

@Component({
    selector: HEADER_COMPONENT_SELECTOR,
    styles: [style],
    template
})
export class HeaderComponent implements OnInit {

    private mainRoute: Object;
    @Input() routes: Array<Object>;

    ngOnInit() {
        const routes = this.routes.filter(route => route['main']);
        this.mainRoute = routes.length ? routes[0] : null;
    }

    get mainPageRoute() {
        return this.mainRoute;
    }

    get navigationRoutes() {
        return this.routes;
    }
}
