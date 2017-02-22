import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceComponent } from './device/device.component';
import { DeviceWidgetComponent } from './device-widgets/device-widget.component';

import { DevicesService } from './devices.service';
import { DeviceListResolver } from './devices.resolver';
import { DeviceWidgetService } from './device-widgets/device-widget.service';
import { ServoWidgetComponent } from './device-widgets/servo-widget/servo-widget.component';
import { SwitcherWidgetComponent } from './device-widgets/switcher-widget/switcher-widget.component';
import { SensorWidgetComponent } from './device-widgets/sensor-widget/sensor-widget.component';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        DeviceWidgetComponent,
        SensorWidgetComponent,
        SwitcherWidgetComponent,
        ServoWidgetComponent,
        DeviceListComponent,
        DeviceComponent
    ],
    exports: [
        DeviceListComponent,
        DeviceComponent,
        DeviceWidgetComponent
    ],
    providers: [
        DevicesService,
        DeviceListResolver,
        DeviceWidgetService
    ]
})
export class DevicesModule {}
