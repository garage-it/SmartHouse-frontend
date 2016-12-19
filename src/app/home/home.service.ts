import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../core/sh-http/sh-http-utils.service';
// TODO: Refactor with subviews
// import { ViewDto } from './view.dto';

@Injectable()
export class HomeService {

    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    // TODO: Refactor with subviews
    // getViewList(): Observable<ViewDto[]|Error> {
    getViewList(): Observable<any[]|Error> {
        return this.http.get('/views')
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }

    // TODO: Refactor with subviews
    // getView(viewId: string): Observable<ViewInfoDto|Error> {
    getView(viewId: string): Observable<any|Error> {
        return this.http.get(`/views/${viewId}`)
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }
}
