import {BaseRequestOptions, RequestOptionsArgs} from 'angular2/http';
import {DEFAULT_URL, DEFAULT_PORT} from './sh-http.config.js';

export default class ShRequestOptions extends BaseRequestOptions {
    constructor(options) {
        super(options);
        this.options = options;
    }
    merge(options:RequestOptionsArgs) {
        const opts = {};
        Object.assign(opts,
            this.options,
            options,
            {url: `${DEFAULT_URL}:${DEFAULT_PORT}/api${options.url}`});
        return super.merge(opts);
    }
}
