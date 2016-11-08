import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { DeviceListComponent } from './device-list.component';
import { DeviceListService } from './device-list.service';
import { SensorDetailService } from '../shared/sensor-detail.service';

@NgModule({
    id: module.id,
    imports: [ CoreModule, RouterModule, FormsModule, SharedModule],
    declarations: [ DeviceListComponent ],
    exports: [ DeviceListComponent ],
    providers: [ DeviceListService, SensorDetailService ]
})
export class DeviceListModule {}
