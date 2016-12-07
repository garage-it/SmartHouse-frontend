import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../core/sh-http/sh-http-utils.service';

@Injectable()
export class HomeService {

    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    getMapList(): Observable<any> {
        return this.http.get('/dashboard/all')
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }
}
