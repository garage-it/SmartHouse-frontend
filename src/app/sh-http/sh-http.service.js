import {Injectable} from 'angular2/core';
import {Http, RequestMethod, Headers} from 'angular2/http';
import ShRequestOptions from './sh-request-options';

@Injectable()
export default class ShHttpService {
    constructor(http:Http) {
        this.http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new ShRequestOptions({ headers: this.headers });
    }
    get(url) {
        return this.http
            .get(url, this._getOptions('Get', url))
            .map(this._convertToJson)
            .catch(this._errorHandling);
    }
    post(url, body) {
        return this.http
            .post(url, JSON.stringify(body), this._getOptions('Post', url))
            .map(this._convertToJson)
            .catch(this._errorHandling);
    }
    put(url, body) {
        return this.http
            .put(url, JSON.stringify(body), this._getOptions('Put', url))
            .map(this._convertToJson)
            .catch(this._errorHandling);
    }
    delete(url) {
        return this.http
            .delete(url, this._getOptions('Delete', url))
            .map(this._convertToJson)
            .catch(this._errorHandling);
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

    _errorHandling(error = {}) {
        const errorMessage = error.message;
        const errorStatus = error.status ? `${error.status} status code` : 'Unknown Server error';

        console.error(errorMessage || errorStatus); // eslint-disable-line
    }
}
