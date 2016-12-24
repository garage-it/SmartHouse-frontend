import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceComponent } from './device/device.component';

import { DevicesService } from './devices.service';
import { DeviceListResolver } from './devices.resolver';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        DeviceListComponent,
        DeviceComponent
    ],
    exports: [
        DeviceListComponent,
        DeviceComponent
    ],
    providers: [
        DevicesService,
        DeviceListResolver
    ]
})
export class DevicesModule {}
