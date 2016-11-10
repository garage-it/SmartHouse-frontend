import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() {
    }

    setToken(token) {
        localStorage.setItem('sh-token', token);
    }

    getToken() {
        return localStorage.getItem('sh-token');
    }

    removeToken() {
        localStorage.removeItem('sh-token');
    }
}
