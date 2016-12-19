import { Component, OnInit } from '@angular/core';

import { NavigationRoute } from '../../navigation-route.model';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LOGOUT_ROUTE } from '../header-navigation-routes';
import { ProfileService } from '../../profile/profile.service';
import { Avatar } from './user.interfaces';
import { CONFIG as AVATAR } from './config.avatar';

@Component({
    selector: 'sh-user',
    styleUrls: ['./user.component.scss'],
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    avatar: Avatar;

    constructor(private profile: ProfileService) {}

    ngOnInit() {
        this.avatar = {
            url: './assets/avatar.png',
            width: AVATAR.WIDTH,
            height: AVATAR.HEIGHT
        };
    }

    get loginRoute(): NavigationRoute {
        return LOGIN_ROUTE;
    }

    get registrationRoute(): NavigationRoute {
        return REGISTRATION_ROUTE;
    }

    get logoutRoute(): NavigationRoute {
        return LOGOUT_ROUTE;
    }

    get userName(): string {
        return this.profile.getUserName();
    }
}
