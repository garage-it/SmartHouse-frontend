import { RouterModule } from '@angular/router';

import { ConstructorComponent } from './constructor.component';
import { DeviceListResolveService } from '../settings/devices/device-list/device-list-resolve.service';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        resolve: {
            sensors: DeviceListResolveService
        }
    }
];

export const routing = RouterModule.forChild(routes);
