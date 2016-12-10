import { RouterModule } from '@angular/router';

import { DeviceListResolver } from '../shared/devices/devices.resolver';
import STATISTIC_ROUTING_CONFIG from './statistic.routing.config';
import { StatisticComponent } from './statistic.component';
import { SensorStatisticComponent } from './sensor-statistic/sensor-statistic.component';
import { SensorStatisticResolveService } from './sensor-statistic/sensor-statistic-resolve.service';

export const routes = [
    {
        path: STATISTIC_ROUTING_CONFIG.BASE,
        component: StatisticComponent,
        resolve: {
            deviceList: DeviceListResolver
        }
    },
    {
        path: STATISTIC_ROUTING_CONFIG.SENSOR_DETAILS,
        component: SensorStatisticComponent,
        resolve: {
            deviceStatistic: SensorStatisticResolveService
        }
    }
];

export const routing = RouterModule.forChild(routes);
