import { Injectable } from '@angular/core';
import { Http, RequestMethod, Headers } from '@angular/http';
import { ShRequestOptions } from './sh-request-options';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShHttpService {
    private headers: Headers;
    private options: ShRequestOptions;

    static _convertToJson(data) {
        return data.json();
    }

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new ShRequestOptions({ headers: this.headers });
    }
    get(url) {
        return this.http
            .get(url, this._getOptions('Get', url))
            .map(ShHttpService._convertToJson);
    }
    post(url, body) {
        return this.http
            .post(url, JSON.stringify(body), this._getOptions('Post', url))
            .map(ShHttpService._convertToJson);
    }
    put(url, body) {
        return this.http
            .put(url, JSON.stringify(body), this._getOptions('Put', url))
            .map(ShHttpService._convertToJson);
    }
    delete(url) {
        return this.http
            .delete(url, this._getOptions('Delete', url))
            .map(ShHttpService._convertToJson);
    }
    setAuthHeader(token) {
        this.headers.set('Authorization', `Bearer ${token}`);
    }
    removeAuthHeader() {
        this.headers.delete('Authorization');
    }
    _getOptions(method, url) {
        return this.options.merge({
            method: RequestMethod[method],
            url
        });
    }

}
