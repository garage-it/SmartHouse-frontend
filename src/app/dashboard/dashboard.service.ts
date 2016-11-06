import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../core/sh-http/sh-http-utils.service';
import { Widget } from './widget.model';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class DashboardService {
    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    getWidgets(): Observable<any> {
        return this.http.get('/dashboard')
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }

    getStatistic(deviceId, period): Observable<any> {
        let params = new URLSearchParams();
        params.set('period', period);
        params.set('sensor', deviceId);

        return this.http.getByParams('/timeseries', params);
    }

    applyChanges(devices: Widget[]): Observable<any> {
        return this.http.put('/dashboard', {devices});
    }

    compareWidgetsLists(initialWidgets: Widget[], updatedWidgets: Widget[]): boolean {
        return !updatedWidgets.some((updatedWidget, i) => {
            const updatedWidgetProperties = Object.keys(updatedWidget);
            const areSimilarWidgets = updatedWidgetProperties
                .some(prop => initialWidgets[i][prop] !== updatedWidget[prop]);

            return areSimilarWidgets;
        });
    }
}
