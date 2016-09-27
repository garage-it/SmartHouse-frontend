import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { routing } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { SensorWidgetComponent } from './sensor-widget/sensor-widget.component';
import {
    SensorExecutorWidgetComponent
} from './sensor-executor-widget/sensor-executor-widget.component';
import { SensorServoWidgetComponent } from './sensor-servo-widget/sensor-servo-widget.component';
import { SensorStatusWidgetComponent } from './sensor-status-widget/sensor-status-widget.component';
import { GaugeComponent } from './shared/gauge/gauge.component';

import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardService } from './dashboard.service';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

@NgModule({
    module: module.id,
    imports: [ SharedModule, RouterModule, FormsModule, routing ],
    declarations: [
        DashboardComponent, DashboardEditorComponent, SensorWidgetComponent,
        SensorExecutorWidgetComponent, SensorServoWidgetComponent, SensorStatusWidgetComponent,
        Dragula, GaugeComponent
    ],
    exports: [ DashboardComponent ],
    providers: [ SensorWidgetService, DashboardService, DashboardResolveService, DragulaService]
})
export class DashboardModule {}
