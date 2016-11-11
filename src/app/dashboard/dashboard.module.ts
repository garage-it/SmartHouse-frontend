import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';

import { SharedModule } from '../shared/shared.module';

import { routing } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';

import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';
import { DashboardResolveService } from './dashboard-resolve.service';
import { SensorStatisticResolveService } from './sensor-statistic/sensor-statistic.resolve.service';
import { DashboardService } from './dashboard.service';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import DASHBOARD_DECLARATIONS from './dashboard.declarations';

@NgModule({
    id: module.id,
    imports: [ SharedModule, RouterModule, FormsModule, routing, DragulaModule, ChartModule ],
    declarations: [ ...DASHBOARD_DECLARATIONS ],
    exports: [ DashboardComponent ],
    providers: [
        SensorWidgetService,
        DashboardService,
        DashboardResolveService,
        SensorStatisticResolveService
    ]
})
export class DashboardModule {}
