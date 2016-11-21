import { Component, OnInit } from '@angular/core';
import { NavigationRoute } from './navigation-route.model';
import { NAVIGATION_ROUTES, MAIN_ROUTE } from './header-navigation-routes';

@Component({
    selector: 'sh-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    get mainPageRoute(): NavigationRoute {
        return MAIN_ROUTE;
    }

    get navigationRoutes(): Array<NavigationRoute> {
        return NAVIGATION_ROUTES;
    }
}
