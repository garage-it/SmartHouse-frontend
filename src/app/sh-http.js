import {Injectable} from 'angular2/core';
import {Http, RequestMethod} from 'angular2/http';
import ShRequestOptions from './sh-request-options';

@Injectable()
export default class ShHttp {
    constructor(http:Http) {
        this.http = http;
        this.options = new ShRequestOptions();
    }
    get(url) {
        return this.http.get(url, this._getOptions('Get', url));
    }
    _getOptions(method, url) {
        return this.options.merge({
            method: RequestMethod[method],
            url
        });
    }
}
