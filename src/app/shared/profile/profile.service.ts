import { Injectable } from '@angular/core';
import { ShHttpService } from '../sh-http/sh-http.service';
import { StorageService } from '../storage/storage.service';

import { User } from './profile.interface';

@Injectable()
export class ProfileService {
    user: User;

    constructor(private http: ShHttpService, private storage: StorageService) {
        this.http = http;
        this.storage = storage;
    }

    retrieve() {
        const token = this.storage.getToken();

        if (!token || this.user) {
            return Promise.resolve(null);
        }

        this.http.setAuthHeader(token);

        return new Promise((resolve) => {
            this.http.get('/user/current-user').toPromise()
                .then(user => {
                    console.log('!!! save user');
                    this.setUserData(user);
                    resolve();
                })
                .catch((err) => {
                    if (err.status === 401) {
                        this.removeUserData();
                    }

                    resolve();
                });
        });
    }

    setUserData(user: User, token?: string) {
        this.user = user;
        if (token) {
            this.storage.setToken(token);
            this.http.setAuthHeader(token);
        }
    }

    removeUserData() {
        this.user = null;
        this.storage.removeToken();
        this.http.removeAuthHeader();
    }

    isLoggedIn() {
        return Boolean(this.user && this.user.role);
    }

    isGuest() {
        return !this.isLoggedIn();
    }
}
