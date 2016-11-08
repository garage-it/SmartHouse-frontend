import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable()
export class GuestGuard implements CanActivate {
    constructor(private router: Router, private profile: ProfileService) {}

    canActivate() {
        return this.profile.retrieve().then(() => {
            if (this.profile.isGuest()) {
                return true;
            }

            this.router.navigate(['/']);
        });
    }
}

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private profile: ProfileService) {}

    canActivate() {
        return this.profile.retrieve().then(() => {
            if (this.profile.isLoggedIn()) {
                return true;
            }

            this.router.navigate(['/login']);
        });
    }
}
