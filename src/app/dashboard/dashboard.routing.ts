import { RouterModule } from '@angular/router';

import DASHBOARD_ROUTING_CONFIG from './dashboard.routing.config';
import { DashboardComponent } from './dashboard.component';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { DashboardSensorDetailsComponent } from './dashboard-sensor-details/dashboard-sensor-details.component';
import { DashboardResolveSensorDetailsService } from './dashboard-sensor-details/dashboard-resolve-sensor-details.service';

export const routes = [
    {
        path: DASHBOARD_ROUTING_CONFIG.BASE,
        component: DashboardComponent,
        resolve: { widgets: DashboardResolveService }
    },
    { path: DASHBOARD_ROUTING_CONFIG.EDITOR, component: DashboardEditorComponent },
    {
        path: DASHBOARD_ROUTING_CONFIG.SENSOR_DETAILS,
        component: DashboardSensorDetailsComponent,
        resolve: { deviceStatistic: DashboardResolveSensorDetailsService }
    }
];

export const routing = RouterModule.forChild(routes);
