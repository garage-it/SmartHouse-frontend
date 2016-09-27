import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DeviceListModule } from './device-list/device-list.module';

import { routing } from './devices.routing';

import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListService } from './device-list/device-list.service';
import { DeviceListResolveService } from './detail-list-resolve.service';


@NgModule({
    module: module.id,
    imports: [ RouterModule, FormsModule, SharedModule, DeviceListModule, routing ],
    declarations: [ SensorDetailComponent ],
    exports: [ SensorDetailComponent ],
    providers: [ DeviceListService, DeviceListResolveService ]
})
export class DevicesModule {}
