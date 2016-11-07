import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { routing } from './registration.routing';

import REGISTRATION_DECLARATIONS from './registration.declarations';

@NgModule({
    id: module.id,
    imports: [ RouterModule, FormsModule, SharedModule, routing ],
    declarations: [ ...REGISTRATION_DECLARATIONS ],
    exports: [ ...REGISTRATION_DECLARATIONS ],
    providers: [
    ]
})
export class RegistrationModule {}
