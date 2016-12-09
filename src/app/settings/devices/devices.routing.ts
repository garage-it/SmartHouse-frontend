import { RouterModule } from '@angular/router';

import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceListResolveService } from './device-list/device-list-resolve.service';
import ROUTING from '../../config.routing';

export const routes = [
    {
        path: '',
        children: [
            {
                path: '', component: DeviceListComponent,
                resolve: {deviceList: DeviceListResolveService}
            },
            { path: ':id', component: SensorDetailComponent },
            { path: ROUTING.CREATE, component: SensorDetailComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
