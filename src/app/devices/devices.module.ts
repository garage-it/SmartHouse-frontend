import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { DeviceListModule } from './device-list/device-list.module';

import { routing } from './devices.routing';

import { DevicesFrameComponent } from './devices-frame/devices-frame.component';
import { DeviceListWithFrameComponent } from './device-list-with-frame/device-list-with-frame.component';
import { SensorDetailComponent } from './sensor-details/sensor-detail.component';
import { DeviceListService } from './device-list/device-list.service';
import { DeviceListResolveService } from './detail-list-resolve.service';
import { SensorDetailService } from './shared/sensor-detail.service';


@NgModule({
    id: module.id,
    imports: [ CoreModule, RouterModule, FormsModule, SharedModule, DeviceListModule, routing ],
    declarations: [ DevicesFrameComponent, SensorDetailComponent, DeviceListWithFrameComponent ],
    exports: [ DevicesFrameComponent, SensorDetailComponent, DeviceListWithFrameComponent ],
    providers: [ SensorDetailService, DeviceListService, DeviceListResolveService ]
})
export class DevicesModule {}
