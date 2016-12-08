import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { StatisticService } from '../statistic.service';

@Injectable()
export class SensorStatisticResolveService implements Resolve<Object> {
    /* TODO add correct type of resolved object when type of resolved data will be completely defined)*/

    constructor(private statisticService: StatisticService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const {id, period} = route.params;
        return this.statisticService.getStatistic(id, period);
    }
}
