import { RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { RolesComponent } from './roles/roles.component';
import { DeviceDetailsPageComponent } from './devices/device-details-page/device-details-page.component';
import { DeviceListPageComponent } from './devices/device-list-page/device-list-page.component';
import { DeviceListResolver } from '../shared/devices/devices.resolver';

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
                component: DeviceListPageComponent,
                resolve: {
                    deviceList: DeviceListResolver
                }
            },
            {
                path: `devices/:id`,
                component: DeviceDetailsPageComponent
            },
            {
                path: `devices/${ROUTING.CREATE}`,
                component: DeviceDetailsPageComponent
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
