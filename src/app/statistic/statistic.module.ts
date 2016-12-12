import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'angular2-highcharts';
import { DevicesModule } from '../shared/devices/devices.module';

import { SensorStatisticResolveService } from './sensor-statistic/sensor-statistic-resolve.service';
import STATISTIC_DECLARATIONS from './statistic.declarations';
import { StatisticComponent } from './statistic.component';
import { StatisticService } from './statistic.service';
import { routing } from './statistic.routing';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        ChartModule,
        CommonModule,
        DevicesModule,
        routing
    ],
    declarations: [ ...STATISTIC_DECLARATIONS ],
    exports: [ StatisticComponent ],
    providers: [ StatisticService, SensorStatisticResolveService ]
})
export class StatisticModule {}
