import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { DashboardService } from '../dashboard.service';

@Injectable()
export class SensorStatisticResolveService implements Resolve<Object> {
    /* TODO add correct type of resolved object when type of resolved data will be completely defined)*/

    constructor(private dashboardService: DashboardService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const {id, period} = route.params;
        return this.dashboardService.getStatistic(id, period);
    }
}
