import { Component, Input } from '@angular/core';
import { ProfileService } from '../../../core/profile/profile.service';

@Component({
    selector: 'protected',
    template: require('./protected.template.html'),
})
export class ProtectedComponent {
    @Input() isAuthorized: boolean;
    @Input() roles: Array<string>;

    private isAllowed: boolean;

    constructor(private profileService: ProfileService) {}

    get allowed(): boolean {
        this.isAllowed = this.isAuthorized === this.profileService.isLoggedIn();

        if (this.isAuthorized) {
            const isLoggedIn = this.profileService.isLoggedIn();
            const isRole = this.roles ? this.profileService.hasUserRole(this.roles) : true;

            this.isAllowed = isLoggedIn && isRole;
        }

        return this.isAllowed;
    }
}
