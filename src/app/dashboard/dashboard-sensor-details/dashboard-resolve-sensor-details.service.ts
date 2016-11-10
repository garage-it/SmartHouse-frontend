import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { DashboardService } from '../dashboard.service';

@Injectable()
export class DashboardResolveSensorDetailsService {
    constructor(private dashboardService: DashboardService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.dashboardService.getStatistic(route.params['id'], route.params['period']);
    }
}
