import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DashboardService } from './dashboard.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class DashboardResolveService  {
    constructor(private dashboardService: DashboardService, private toastr: ToastsManager) { }

    resolve() {
        return this.dashboardService.getWidgets()
            .catch(error => {
                this.toastr.error(error);
                return Observable.never();
            });
    }
}
