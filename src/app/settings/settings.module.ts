import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RolesService } from './roles/roles.service';
import { DevicesModule } from '../shared/devices/devices.module';

import { routing } from './settings.routing';

import SETTINGS_DECLARATIONS from './settings.declarations';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule,
        DevicesModule,
        routing
    ],
    declarations: [ ...SETTINGS_DECLARATIONS ],
    exports: [ ...SETTINGS_DECLARATIONS ],
    providers: [
        RolesService
    ]
})
export class SettingsModule {}
