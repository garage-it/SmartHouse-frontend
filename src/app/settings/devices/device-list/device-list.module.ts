import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { DeviceListComponent } from './device-list.component';
import { DeviceListService } from './device-list.service';
import { SensorDetailService } from '../shared/sensor-detail.service';
import { DeviceListResolveService } from './device-list-resolve.service';

@NgModule({
    id: module.id,
    imports: [ RouterModule, FormsModule, SharedModule],
    declarations: [ DeviceListComponent ],
    exports: [ DeviceListComponent ],
    providers: [ DeviceListService, SensorDetailService, DeviceListResolveService ]
})
export class DeviceListModule {}
