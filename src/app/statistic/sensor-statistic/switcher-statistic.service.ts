import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { URLSearchParams } from '@angular/http';
export const PIE_CHART_ENDPOINT = '/switcher-statistics/pieChart';

@Injectable()
export class SwitcherStatisticsService {
    constructor(private http: ShHttpService) { }

    getPieChartData(sensor, {startDate, endDate}): Observable<any> {
        const params = new URLSearchParams();
        params.set('startDate', startDate);
        params.set('endDate', endDate);
        params.set('sensor', sensor);

        return this.http.get(PIE_CHART_ENDPOINT, params);
    }
}
