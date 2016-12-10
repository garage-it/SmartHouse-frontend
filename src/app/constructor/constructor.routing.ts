import { RouterModule } from '@angular/router';

import { ConstructorComponent } from './constructor.component';
import { DeviceListResolver } from '../shared/devices/devices.resolver';
import { DashboardViewResolveService } from './dashboard/dashboard-view/dashboard-view-resolve.service';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        resolve: {
            dashboard: DashboardViewResolveService,
            sensors: DeviceListResolver
        }
    }
];

export const routing = RouterModule.forChild(routes);
