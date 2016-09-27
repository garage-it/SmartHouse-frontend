import { Injectable } from '@angular/core';

import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardResolveService {
    constructor(private dashboardService: DashboardService) {
        this.dashboardService = dashboardService;
    }

    resolve() {
        return this.dashboardService.getWidgets();
    }
}
