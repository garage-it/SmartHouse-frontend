import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../../core/sh-http/sh-http-utils.service';
import { Device } from '../../settings/devices/device.model';

@Injectable()
export class DashboardConstructorService {

    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    getWidgets(): Observable<any> { //TODO Only for edit, Should be modified in TG-291
        return this.http.get('/dashboard')
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }

    saveDashboard(devices: Device[]): Observable<any> {
        return this.http.post('/dashboard', {devices});
    }
}
