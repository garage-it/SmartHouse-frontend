import {BaseRequestOptions, RequestOptionsArgs} from 'angular2/http';

const DEFAULT_URL = 'http://localhost';
const DEFAULT_PORT = '3000';

export default class ShRequestOptions extends BaseRequestOptions {
    merge(options:RequestOptionsArgs) {
        const opts = {};
        Object.assign(opts, options, {url: `${DEFAULT_URL}:${DEFAULT_PORT}/api${options.url}`});
        return super.merge(opts);
    }
}
