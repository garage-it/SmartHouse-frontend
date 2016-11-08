import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
            return Observable.from([null]);
        }

        this.http.setAuthHeader(token);

        return this.http.get('/user/current-user')
            .map(user => {
                this.setUserData(user);
            })
            .catch((err, caught) => {
                if (err.status === 401) {
                    this.removeUserData();
                }

                return Observable.from([null]);
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
