import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class ShHttpService {

    public static onResponseSuccess(data) {
        return data.json();
    }

    constructor(private http: Http, private defaultOptions: RequestOptions) {
    }

    get(url, search?: URLSearchParams) {
        return this.http
            .get(url, this.defaultOptions.merge({ url, search }))
            .map(ShHttpService.onResponseSuccess);
    }

    post(url, body) {
        return this.http
            .post(url, body, this.defaultOptions.merge({ url }))
            .map(ShHttpService.onResponseSuccess);
    }

    put(url, body) {
        return this.http
            .put(url, body, this.defaultOptions.merge({ url }))
            .map(ShHttpService.onResponseSuccess);
    }

    delete(url) {
        return this.http
            .delete(url, this.defaultOptions.merge({ url }))
            .map(ShHttpService.onResponseSuccess);
    }

    setAuthHeader(token) {
        this.defaultOptions.headers.set('Authorization', `Bearer ${token}`);
    }

    removeAuthHeader() {
        this.defaultOptions.headers.delete('Authorization');
    }
}
