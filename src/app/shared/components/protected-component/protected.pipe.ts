import { Pipe, PipeTransform } from '@angular/core';
import { ProfileService } from '../../../core/profile/profile.service';

@Pipe({ name: 'checkLogin', pure: false })
export class CheckLoginPipe implements PipeTransform {

    constructor(private profileService: ProfileService) {}

    transform(isLoggedIn: boolean, roles: Array<string> ) {
        if (isLoggedIn === undefined || isLoggedIn === this.profileService.isLoggedIn()) {
            const userRole = this.profileService.getUserRole();
            const isAllowableRole = roles && roles.indexOf(userRole) !== -1;

            return !isAllowableRole;
        }
    }
}
