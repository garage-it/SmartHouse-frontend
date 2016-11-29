import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';

import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardService } from './dashboard.service';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import DASHBOARD_DECLARATIONS from './dashboard.declarations';
import { SensorWidgetComponent } from './sensor-widget/sensor-widget.component';

@NgModule({
    id: module.id,
    imports: [ SharedModule, RouterModule, FormsModule, DragulaModule ],
    declarations: [ ...DASHBOARD_DECLARATIONS ],
    exports: [ DashboardComponent, SensorWidgetComponent ],
    providers: [
        SensorWidgetService,
        DashboardService,
        DashboardResolveService
    ]
})
export class DashboardModule {}
