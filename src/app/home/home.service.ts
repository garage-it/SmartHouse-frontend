import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../core/sh-http/sh-http-utils.service';
import { ViewDto } from './view.dto';

@Injectable()
export class HomeService {

    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    getViewList(): Observable<ViewDto[]|Error> {
        return this.http.get('/views')
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }
}
