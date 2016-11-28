import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../../core/sh-http/sh-http-utils.service';
import { Device } from '../../devices/device.model';

@Injectable()
export class DashboardConstructorService {

    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    getWidgets(): Observable<any> {
        return this.http.get('/sensors') // TODO dashboard-view get
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }

    saveDashboard(devices: Device[]): Observable<any> {
        return this.http.put('/dashboard-view', {devices}); // TODO dashboard-view put
    }
}
