import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { DevicesService } from './devices.service';
import { DeviceListResolver } from './devices.resolver';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule
    ],
    declarations: [],
    exports: [],
    providers: [
        DevicesService,
        DeviceListResolver
    ]
})
export class DevicesModule {}
