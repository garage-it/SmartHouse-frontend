import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DashboardConstructorService } from '../dashboard-constructor.service';

@Injectable()
export class DashboardViewResolveService {

    constructor(private dashboardConstructorService: DashboardConstructorService,
                private toastr: ToastsManager) {
    }

    resolve(): Observable<any> {
        return this.dashboardConstructorService.getWidgets()
            .map(({devices}) => devices)
            .catch(errorMessage => {
                this.toastr.error(errorMessage);

                return Observable.never();
            });
    }
}
