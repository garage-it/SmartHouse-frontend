import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'angular2-highcharts';
import { DevicesModule } from '../shared/devices/devices.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

// TODO: Create SensorStatisticModule and move these file there.
import { SensorStatisticResolveService } from './sensor-statistic/sensor-statistic-resolve.service';
import { SwitcherStatisticsService } from './sensor-statistic/switcher-statistic.service';

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
        Ng2DatetimePickerModule,
        routing
    ],
    declarations: [ ...STATISTIC_DECLARATIONS ],
    exports: [ StatisticComponent ],
    providers: [ StatisticService, SensorStatisticResolveService, SwitcherStatisticsService ]
})
export class StatisticModule {}
