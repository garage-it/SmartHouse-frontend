import {Injectable} from '@angular/core';
import { Http, RequestMethod, Headers} from '@angular/http';
import { ShRequestOptions } from './sh-request-options';

import 'rxjs/add/operator/map';

@Injectable()
export class ShHttpService {
    constructor(http:Http) {
        this.http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new ShRequestOptions({ headers: this.headers });
    }
    get(url) {
        return this.http
            .get(url, this._getOptions('Get', url))
            .map(this._convertToJson);
    }
    post(url, body) {
        return this.http
            .post(url, JSON.stringify(body), this._getOptions('Post', url))
            .map(this._convertToJson);
    }
    put(url, body) {
        return this.http
            .put(url, JSON.stringify(body), this._getOptions('Put', url))
            .map(this._convertToJson);
    }
    delete(url) {
        return this.http
            .delete(url, this._getOptions('Delete', url))
            .map(this._convertToJson);
    }
    _getOptions(method, url) {
        return this.options.merge({
            method: RequestMethod[method],
            url
        });
    }
    _convertToJson(data) {
        return data.json();
    }
}
