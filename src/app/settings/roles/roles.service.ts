import { Injectable } from '@angular/core';

import { ShHttpService } from '../../core/sh-http/sh-http.service';

@Injectable()
export class RolesService {
    constructor(private http: ShHttpService) {}

    retrieve() {
        return this.http.get('/user');
    }
}
