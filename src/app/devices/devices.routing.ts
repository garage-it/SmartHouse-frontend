import { RouterModule } from '@angular/router';

import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListWithFrameComponent } from './device-list-with-frame/device-list-with-frame.component';
import { DeviceListResolveService } from './detail-list-resolve.service';

export const routes = [
    {
        path: '',
        children: [
            {
                path: '', component: DeviceListWithFrameComponent,
                resolve: {deviceList: DeviceListResolveService}
            },
            { path: ':id', component: SensorDetailComponent },
            { path: 'create', component: SensorDetailComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
