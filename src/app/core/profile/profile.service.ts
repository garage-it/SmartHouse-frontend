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
    retrieve():Promise<void> {
        const token = this.storage.getToken();

        if (!token || this.user) {
            return Promise.resolve();
        }

        this.http.setAuthHeader(token);

        return this.http.get('/user/current-user').toPromise()
            .then(user => {
                this.setUserData(user);

                return undefined;
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
        return Boolean(this.user && this.user.role);
    }

    isGuest(): boolean {
        return !this.isLoggedIn();
    }
}
