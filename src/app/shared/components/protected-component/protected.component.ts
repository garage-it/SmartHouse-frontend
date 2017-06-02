import { Component, Input } from '@angular/core';
import { ProfileService } from '../../../core/profile/profile.service';

@Component({
    selector: 'sh-protected',
    templateUrl: './protected.template.html',
})
export class ProtectedComponent {
    @Input() isAuthorized: boolean;
    @Input() roles: Array<string>;

    constructor(private profileService: ProfileService) {}

    get allowed(): boolean {
        if (this.isAuthorized) {
            if (this.profileService.isLoggedIn()) {
                return this.profileService.isUserRoleIn(this.roles);
            }

            return false;
        }

        return this.profileService.isGuest();
    }
}
