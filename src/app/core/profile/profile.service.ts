import { Injectable } from '@angular/core';
import { ShHttpService } from '../sh-http/sh-http.service';
import { StorageService } from '../storage/storage.service';

import { User } from './profile.interfaces';

@Injectable()
export class ProfileService {
    user: User;

    constructor(private http: ShHttpService, private storage: StorageService) {}

    /**
     * In oeder to get profile info use sync public methods (isLoggedIn() and isGuest()) or "user" property
     */
    retrieve(): Promise<void> {
        const token = this.storage.getToken();

        if (!token || this.user) {
            return Promise.resolve();
        }

        this.http.setAuthHeader(token);

        return this.http.get('/user/current-user').toPromise()
            .then((data: {responses: User}) => {
                this.setUserData(data.responses);
            })
            .catch((err) => {
                if (err.status === 401) {
                    this.removeUserData();
                }
            });
    }

    setUserData(user: User, token?: string): void {
        this.user = user;

        if (token) {
            this.storage.setToken(token);
            this.http.setAuthHeader(token);
        }
    }

    removeUserData(): void {
        this.user = null;
        this.storage.removeToken();
        this.http.removeAuthHeader();
    }

    isLoggedIn(): boolean {
        return !!this.user;
    }

    isGuest(): boolean {
        return !this.isLoggedIn();
    }

    getUserRole(): string {
        return this.user.role;
    }

    isUserRoleIn(roles: Array<string>): boolean {
        if (roles && roles.length) {
            return roles.indexOf(this.getUserRole()) !== -1;
        }
        /*
         * When roles not transferred
         * we assume that for all roles we want to allow
         */
        return true;
    }
}
