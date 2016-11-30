import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RolesService } from './roles/roles.service';

import { routing } from './settings.routing';

import SETTINGS_DECLARATIONS from './settings.declarations';

@NgModule({
    id: module.id,
    imports: [ RouterModule, SharedModule, routing ],
    declarations: [ ...SETTINGS_DECLARATIONS ],
    exports: [ ...SETTINGS_DECLARATIONS ],
    providers: [
        RolesService
    ]
})
export class SettingsModule {}
