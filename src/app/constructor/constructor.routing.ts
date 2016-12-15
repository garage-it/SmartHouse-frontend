import { RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import { DeviceListResolver } from '../shared/devices/devices.resolver';
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
        path: 'editor/:id',
        component: ConstructorComponent,
        canDeactivate: [CanDeactivateConstructor],
        resolve: {
            view: ViewResolveService
        }
    }
];

export const routing = RouterModule.forChild(routes);
