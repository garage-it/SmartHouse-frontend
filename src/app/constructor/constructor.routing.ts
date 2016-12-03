import { RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import { DeviceListResolveService } from '../devices/device-list/device-list-resolve.service';
import { DashboardViewResolveService } from './dashboard/dashboard-view/dashboard-view-resolve.service';
import { CanDeactivateConstructor } from './can-deactivate-constructor';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        resolve: {
            dashboard: DashboardViewResolveService,
            sensors: DeviceListResolveService
        },
        canDeactivate: [ CanDeactivateConstructor ]
    }
];

export const routing = RouterModule.forChild(routes);
