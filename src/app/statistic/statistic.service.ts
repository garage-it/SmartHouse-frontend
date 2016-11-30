import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class StatisticService {

    constructor(private http: ShHttpService) { }

    getStatistic(deviceId, period): Observable<any> {
        const params = new URLSearchParams();
        params.set('period', period);
        params.set('sensor', deviceId);

        return this.http.get('/timeseries', params);
    }
}
