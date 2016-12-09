import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DevicesModule } from './shared/devices.module';

import { routing } from './devices.routing';

import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListComponent } from './device-list/device-list.component';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule,
        DevicesModule,
        routing
    ],
    declarations: [
        SensorDetailComponent,
        DeviceListComponent
    ],
    exports: [
        SensorDetailComponent,
        DeviceListComponent
    ],
    providers: []
})
export class DevicesPageModule {}
