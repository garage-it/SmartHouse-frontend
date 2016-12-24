import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import DASHBOARD_DECLARATIONS from './sensors.declarations';
import { DeviceWidgetComponent } from './device-widget.component';

@NgModule({
    id: module.id,
    imports: [ SharedModule, RouterModule, FormsModule, DragulaModule ],
    declarations: [ ...DASHBOARD_DECLARATIONS ],
    exports: [ DeviceWidgetComponent ],
    providers: [
        SensorWidgetService
    ]
})
export class SensorsModule {}
