import {Injectable} from 'angular2/core';
import {Http, RequestMethod, Headers} from 'angular2/http';
import ShRequestOptions from './sh-request-options';

@Injectable()
export default class ShHttp {
    constructor(http:Http) {
        this.http = http;
    }
    get(url) {
        this.options = new ShRequestOptions();
        return this.http.get(url, this._getOptions('Get', url));
    }
    put(url, body) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new ShRequestOptions({ headers });
        return this.http.put(url, body, this._getOptions('Put', url));
    }
    _getOptions(method, url) {
        return this.options.merge({
            method: RequestMethod[method],
            url
        });
    }
}
