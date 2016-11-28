import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { FbCallbackComponent } from './fb-callback.component';
import { routing } from './login.routing';

@NgModule({
    id: module.id,
    imports: [ SharedModule, FormsModule, routing ],
    providers: [],
    declarations: [
        LoginComponent,
        FbCallbackComponent
    ]
})
export class LoginModule {}
