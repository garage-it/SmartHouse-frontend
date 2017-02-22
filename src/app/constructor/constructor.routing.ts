import { RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import { DeviceListResolver } from '../devices/devices.resolver';
import { CanDeactivateConstructor } from './can-deactivate-constructor';
import { ViewResolveService } from './view-resolve.service';

export const routes = [
    {
        path: '',
        component: ConstructorComponent,
        canDeactivate: [CanDeactivateConstructor],
        resolve: {
            sensors: DeviceListResolver
        }
    },
    {
        path: ':id',
        component: ConstructorComponent,
        canDeactivate: [CanDeactivateConstructor],
        resolve: {
            sensors: DeviceListResolver,
            view: ViewResolveService
        }
    }
];

export const routing = RouterModule.forChild(routes);
