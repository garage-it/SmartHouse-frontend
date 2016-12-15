import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class ShRequestOptions extends BaseRequestOptions {

    private static resolveApiUrl(url: string): string {
        /*
         * For fix issue with incorrect Angular2 merging
         * Because Angular 2 run merge method twice for get type http request
         * and once for other types.
         */
        return url.includes('/api')
            ? url
            : `${ENV_PUBLIC_CONFIG.backEndUrl}/api${url}`;
    }

    constructor() {
        super();
        this.headers.set('Content-Type', 'application/json');
    }

    public merge(options: RequestOptionsArgs) {
        return super.merge(Object.assign({}, options, {
            url: options.url && ShRequestOptions.resolveApiUrl(options.url)
        }));
    }
}
