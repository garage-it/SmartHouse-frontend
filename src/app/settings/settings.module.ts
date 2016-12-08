import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RolesService } from './roles/roles.service';

import { DeviceListService } from './devices/device-list/device-list.service';
import { DeviceListResolveService } from './devices/device-list/device-list-resolve.service';
import { SensorDetailService } from './devices/shared/sensor-detail.service';

import { routing } from './settings.routing';

import SETTINGS_DECLARATIONS from './settings.declarations';

@NgModule({
    id: module.id,
    imports: [ RouterModule, FormsModule, SharedModule, routing ],
    declarations: [ ...SETTINGS_DECLARATIONS ],
    exports: [ ...SETTINGS_DECLARATIONS ],
    providers: [
        RolesService,
        SensorDetailService,
        DeviceListService,
        DeviceListResolveService
    ]
})
export class SettingsModule {}
