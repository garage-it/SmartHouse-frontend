import { Component } from '@angular/core';
import { NavigationRoute } from './navigation-route.model';
import { NAVIGATION_ROUTES, MAIN_ROUTE } from './header-navigation-routes';
import { ProfileService } from '../profile/profile.service';

@Component({
    selector: 'sh-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    constructor(private profile: ProfileService) {}

    get mainPageRoute(): NavigationRoute {
        return MAIN_ROUTE;
    }

    get navigationRoutes(): Array<NavigationRoute> {
        return NAVIGATION_ROUTES;
    }

    isOptionHidden(route): boolean {
        return route.authRequired && this.profile.isGuest();
    }
}
