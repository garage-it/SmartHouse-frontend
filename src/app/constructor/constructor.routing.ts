import { RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import { DeviceListResolver } from '../shared/devices/devices.resolver';
import { CanDeactivateConstructor } from './can-deactivate-constructor';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        canDeactivate: [ CanDeactivateConstructor ],
        resolve: {
            sensors: DeviceListResolver
        }
    }
];

export const routing = RouterModule.forChild(routes);
