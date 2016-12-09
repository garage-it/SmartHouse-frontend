import { RouterModule } from '@angular/router';

import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListPageComponent } from './device-list-page/device-list-page.component';
import { DeviceListResolver } from './shared/devices.resolver';
import ROUTING from './../config.routing';

export const routes = [
    {
        path: '',
        children: [
            {
                path: '', component: DeviceListPageComponent,
                resolve: {
                    deviceList: DeviceListResolver
                }
            },
            {
                path: ':id',
                component: SensorDetailComponent
            },
            {
                path: ROUTING.CREATE,
                component: SensorDetailComponent
            }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
