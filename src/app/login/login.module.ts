import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { routing } from './login.routing';

@NgModule({
    id: module.id,
    imports: [ SharedModule, routing ],
    declarations: [ LoginComponent ]
})
export class LoginModule {}
