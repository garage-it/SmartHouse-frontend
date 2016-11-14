import { RouterModule } from '@angular/router';

import DASHBOARD_ROUTING_CONFIG from './dashboard.routing.config';
import { DashboardComponent } from './dashboard.component';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { SensorStatisticComponent } from './sensor-statistic/sensor-statistic.component';
import { SensorStatisticResolveService } from './sensor-statistic/sensor-statistic-resolve.service';

export const routes = [
    {
        path: DASHBOARD_ROUTING_CONFIG.BASE,
        component: DashboardComponent,
        resolve: { widgets: DashboardResolveService }
    },
    { path: DASHBOARD_ROUTING_CONFIG.EDITOR, component: DashboardEditorComponent },
    {
        path: DASHBOARD_ROUTING_CONFIG.SENSOR_DETAILS,
        component: SensorStatisticComponent,
        resolve: { deviceStatistic: SensorStatisticResolveService }
    }
];

export const routing = RouterModule.forChild(routes);
