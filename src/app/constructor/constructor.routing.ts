import { RouterModule } from '@angular/router';

import { ConstructorComponent } from './constructor.component';
import { DeviceListResolveService } from '../devices/device-list/device-list-resolve.service';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        resolve: {
            devices: DeviceListResolveService
        }
    }
];

export const routing = RouterModule.forChild(routes);
