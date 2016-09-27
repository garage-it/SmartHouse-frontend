import DashboardService from './dashboard.service';

export class DashboardResolveService {
    constructor(dashboardService: DashboardService) {
        this.dashboardService = dashboardService;
    }

    resolve() {
        return this.dashboardService.getWidgets();
    }
}
