import { Component, Input } from '@angular/core';
import { ProfileService } from '../../../core/profile/profile.service';

@Component({
    selector: 'protected',
    template: require('./protected.template.html'),
})
export class ProtectedComponent {
    @Input() isAuthorized: boolean;
    @Input() roles: Array<string>;

    constructor(private profileService: ProfileService) {}

    get allowed(): boolean {
        if (this.isAuthorized) {
            if (this.profileService.isLoggedIn()) {
                if (this.roles && this.roles.length) {
                    return this.profileService.hasUserRole(this.roles);
                }

                return true;
            }

            return false;
        } else {
            return this.profileService.isGuest();
        }
    }
}
