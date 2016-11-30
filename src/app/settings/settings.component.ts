import { Component } from '@angular/core';

import { NavigationRoute } from '../core/navigation-route.model';
import { NAVIGATION_ROUTES } from './settings-navigation-routes';

@Component({
    selector: 'sh-settings',
    styleUrls: ['./settings.component.scss'],
    templateUrl: './settings.template.html'
})
export class SettingsComponent {
    get navigationRoutes(): Array<NavigationRoute> {
        return NAVIGATION_ROUTES;
    }
}
