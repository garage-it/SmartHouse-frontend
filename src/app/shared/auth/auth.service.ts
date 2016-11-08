import { Injectable } from '@angular/core';

import { ShHttpService } from '../sh-http/sh-http.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {

    constructor(private http: ShHttpService, private profile: ProfileService) { }

    login(body) {
        return this.http.post('/auth/login', body)
            .map(data => {
                this.profile.setUserData(data.user, data.token);
            });
    }

    logout() {
        this.profile.removeUserData();
    }
}
