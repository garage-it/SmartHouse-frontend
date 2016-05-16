import {BaseRequestOptions, RequestOptionsArgs} from 'angular2/http';
import {BACK_END_REST} from '../shared/config';

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
            {url: `${BACK_END_REST}/api${options.url}`});
        return super.merge(opts);
    }
}
