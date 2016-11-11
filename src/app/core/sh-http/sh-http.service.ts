import { Injectable } from '@angular/core';
import {Http, RequestMethod, Headers, URLSearchParams} from '@angular/http';
import { ShRequestOptions } from './sh-request-options';

@Injectable()
export class ShHttpService {
    private headers: Headers;
    private options: ShRequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new ShRequestOptions({ headers: this.headers });
    }

    get(url, params?: URLSearchParams) {
        return this.http
            .get(url, this.getRequestOptions('Get', url, params))
            .map(this.convertToJson);
    }

    post(url, body) {
        return this.http
            .post(url, JSON.stringify(body), this.getRequestOptions('Post', url))
            .map(this.convertToJson);
    }

    put(url, body) {
        return this.http
            .put(url, JSON.stringify(body), this.getRequestOptions('Put', url))
            .map(this.convertToJson);
    }

    delete(url) {
        return this.http
            .delete(url, this.getRequestOptions('Delete', url))
            .map(this.convertToJson);
    }

    setAuthHeader(token) {
        this.headers.set('Authorization', `Bearer ${token}`);
    }

    removeAuthHeader() {
        this.headers.delete('Authorization');
    }

    private convertToJson(data) {
        return data.json();
    }

    private getRequestOptions(method, url, params?: URLSearchParams) {
        return this.options.merge({
            search: params,
            method: RequestMethod[method],
            url
        });
    }
}
