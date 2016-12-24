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
import { DeviceServoWidgetComponent } from './device-widgets/device-servo-widget/device-servo-widget.component';
import { DeviceSwitcherWidgetComponent } from './device-widgets/device-switcher-widget/device-switcher-widget.component';
import { DeviceSensorWidgetComponent } from './device-widgets/device-sensor-widget/device-sensor-widget.component';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        DeviceWidgetComponent,
        DeviceSensorWidgetComponent,
        DeviceSwitcherWidgetComponent,
        DeviceServoWidgetComponent,
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
