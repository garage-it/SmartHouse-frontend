import { RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { RolesComponent } from './roles/roles.component';
import { SensorDetailComponent } from './devices/sensor-details/sensor-detail.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceListResolveService } from './devices/device-list/device-list-resolve.service';

import ROUTING from './../config.routing';

export const routes = [
    {
        path: '',
        children: [
            {
                path: 'roles',
                component: RolesComponent
            },
            {
                path: 'devices',
                component: DeviceListComponent,
                resolve: {
                    deviceList: DeviceListResolveService
                }
            },
            {
                path: `devices/:id`,
                component: SensorDetailComponent
            },
            {
                path: `devices/${ROUTING.CREATE}`,
                component: SensorDetailComponent
            },
            {
                path: 'general',
                component: GeneralComponent
            },
            {
                path: '**',
                redirectTo: 'general',
                pathMatch: 'full'
            }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
