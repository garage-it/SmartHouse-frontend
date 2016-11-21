import { Component, OnInit } from '@angular/core';
import { NavigationRoute } from './navigation-route.model';
import { NAVIGATION_ROUTES } from './header-navigation-routes';

@Component({
    selector: 'sh-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    private mainRoute?: NavigationRoute;

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
