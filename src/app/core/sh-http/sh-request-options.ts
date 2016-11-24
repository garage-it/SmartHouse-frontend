import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class ShRequestOptions extends BaseRequestOptions {

    private static resolveApiUrl(url) {
        return `${ENV_PUBLIC_CONFIG.backEndUrl}/api${url}`;
    }

    constructor() {
        super();
        this.headers.set('Content-Type', 'application/json');
    }

    public merge(options: RequestOptionsArgs) {
        return super.merge(Object.assign({}, options, {
            url: ShRequestOptions.resolveApiUrl(options.url)
        }));
    }
}
