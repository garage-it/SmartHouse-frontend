import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { routing } from './login.routing';

@NgModule({
    id: module.id,
    imports: [ SharedModule, FormsModule, routing ],
    declarations: [ LoginComponent ]
})
export class LoginModule {}
