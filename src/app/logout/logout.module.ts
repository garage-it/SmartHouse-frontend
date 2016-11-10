import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LogoutComponent } from './logout.component';
import { routing } from './logout.routing';

@NgModule({
    id: module.id,
    imports: [ SharedModule, FormsModule, routing ],
    declarations: [ LogoutComponent ]
})
export class LogoutModule {}
