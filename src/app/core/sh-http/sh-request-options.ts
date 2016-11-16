import { BaseRequestOptions, RequestOptionsArgs } from '@angular/http';


export class ShRequestOptions extends BaseRequestOptions {

    constructor(private options) {
        super();
    }

    merge(options: RequestOptionsArgs) {
        const opts = {};

        Object.assign(
            opts,
            this.options,
            options,
            {
                url: `${ENV_PUBLIC_CONFIG.backEndUrl}/api${options.url}`
            }
        );
        return super.merge(opts);
    }
}
