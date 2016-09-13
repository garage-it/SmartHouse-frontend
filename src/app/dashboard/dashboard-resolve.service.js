import DashboardService from './dashboard.service';
import { Observable } from 'rxjs/Observable';

export class DashboardResolveService {
    constructor(dashboardService: DashboardService) {
        this.dashboardService = dashboardService;
    }

    resolve(): Observable<any> {
        return this.dashboardService.getWidgets();
    }
}
