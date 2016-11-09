import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { ShHttpService } from '../sh-http/sh-http.service';
import { ProfileService } from '../profile/profile.service';
import { IUserCredentials } from '../auth/auth.interfaces';

@Injectable()
export class AuthService {

    constructor(private http: ShHttpService, private profile: ProfileService) { }

    login(credentials: IUserCredentials): Observable<any> {
        return this.http.post('/auth/login', credentials).map(data => {
            this.profile.setUserData(data.user, data.token);
        });
    }

    logout(): void {
        this.profile.removeUserData();
    }
}
