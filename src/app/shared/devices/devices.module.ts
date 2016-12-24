import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared.module';

import { DeviceListComponent } from './device-list/device-list.component';

import { DevicesService } from './devices.service';
import { DeviceListResolver } from './devices.resolver';
import { DeviceComponent } from './device/device.component';

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
