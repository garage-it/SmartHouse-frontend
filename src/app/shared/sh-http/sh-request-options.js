import {BaseRequestOptions, RequestOptionsArgs} from '@angular/http';

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
            {url: `${ENV_PUBLIC_CONFIG.backEndUrl}/api${options.url}`});
        return super.merge(opts);
    }
}
