import { Component, OnInit } from '@angular/core';
import { NAVIGATION_ROUTES } from './header-navigation-routes';

@Component({
    selector: 'sh-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    private mainRoute: Object;

    ngOnInit() {
        const routes = NAVIGATION_ROUTES.filter(route => route.main);
        this.mainRoute = routes && routes.length ? routes[0] : null;
    }

    get mainPageRoute() {
        return this.mainRoute;
    }

    get navigationRoutes() {
        return NAVIGATION_ROUTES;
    }
}
