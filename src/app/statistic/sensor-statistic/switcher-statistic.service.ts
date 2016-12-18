import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { URLSearchParams } from '@angular/http';
export const PIE_CHART_ENDPOINT = '/switcher-statistics'; // This is a mock endpoint and should be changed

@Injectable()
export class SwitcherStatisticsService {
    constructor(private http: ShHttpService) { }

    getPieChartData(sensor, {startDate, endDate}): Promise<any> {
        const params = new URLSearchParams();
        params.set('startDate', startDate);
        params.set('endDate', endDate);
        params.set('sensor', sensor);
        params.set('period', 'day'); // Added because of mock API

        return this.http.get(PIE_CHART_ENDPOINT, params).toPromise();
    }
}
