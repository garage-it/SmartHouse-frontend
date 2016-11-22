import { RouterModule } from '@angular/router';

import { ConstructorComponent } from './constructor.component';
import { DashboardResolveService } from '../core/dashboard/dashboard-resolve.service';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        resolve: { widgets: DashboardResolveService }
    }
];

export const routing = RouterModule.forChild(routes);
