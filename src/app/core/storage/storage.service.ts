import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    private tokenKey: string = 'sh-token';

    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }
}
