import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DevicesModule } from './shared/devices.module';

import { routing } from './devices.routing';

import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListPageComponent } from './device-list-page/device-list-page.component';

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
        DeviceListPageComponent
    ],
    exports: [
        SensorDetailComponent,
        DeviceListPageComponent
    ],
    providers: []
})
export class DevicesPageModule {}
