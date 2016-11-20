import { RouterModule } from '@angular/router';

import STATISTIC_ROUTING_CONFIG from './statistic.routing.config';
import { StatisticComponent } from './statistic.component';


export const routes = [
    {
        path: STATISTIC_ROUTING_CONFIG.BASE,
        component: StatisticComponent
    }
];

export const routing = RouterModule.forChild(routes);
