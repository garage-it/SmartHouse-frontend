import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { ShHttpService } from '../sh-http/sh-http.service';
import { ProfileService } from '../profile/profile.service';
import { IUserCredentials, IUserRegistrationData } from './auth.interfaces';

@Injectable()
export class AuthService {

    constructor(private http: ShHttpService, private profile: ProfileService) { }

    login(credentials: IUserCredentials): Observable<any> {
        return this.http.post('/auth/login', credentials).map(data => {
            this.setUserData(data);
            return data;
        });
    }

    logout(): void {
        this.profile.removeUserData();
    }

    register(registrationData: IUserRegistrationData): Observable<any> {
        return this.http.post('/auth/register', registrationData).map(data => {
            this.setUserData(data);
        });
    }

    setUserData({ user, token }): void {
        this.profile.setUserData(user, token);
    }

    loginByAccessToken(token: string): Observable<any> {
        return this.http.post(
            '/auth/login-facebook-with-access-token',
            {
                access_token: token
            }
        ).map(data => {
            this.setUserData(data);
        });
    }
}
