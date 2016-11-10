import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { DashboardSensorDetailsComponent } from './dashboard-sensor-details/dashboard-sensor-details.component';
import { DashboardResolveSensorDetailsService } from './dashboard-sensor-details/dashboard-resolve-sensor-details.service';

export const routes = [
    { path: '', component: DashboardComponent, resolve: { widgets: DashboardResolveService }},
    { path: 'editor', component: DashboardEditorComponent },
    {
        path: 'sensor_details/:id/:period',
        component: DashboardSensorDetailsComponent,
        resolve: { deviceStatistic: DashboardResolveSensorDetailsService }
    }
];

export const routing = RouterModule.forChild(routes);
