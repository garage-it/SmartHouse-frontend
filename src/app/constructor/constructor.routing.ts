import { RouterModule } from '@angular/router';

import { ConstructorComponent } from './constructor.component';
import { DeviceListResolver } from '../shared/devices/devices.resolver';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        resolve: {
            sensors: DeviceListResolver
        }
    }
];

export const routing = RouterModule.forChild(routes);
