import {BaseRequestOptions, RequestOptionsArgs} from 'angular2/http';

export default class ShRequestOptions extends BaseRequestOptions {
    options: any;

    constructor(options) {
        super();
        this.options = options;
    }
    merge(options:RequestOptionsArgs) {
        const opts = {};
        Object.assign(opts,
            this.options,
            options,
            {url: `${ENV_PUBLIC_CONFIG.backEndUrl}/api${options.url}`});
        return super.merge(opts);
    }
}
