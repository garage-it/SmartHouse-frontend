import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HelpComponent } from './help.component';
import { routing } from './help.routing';

@NgModule({
    module: module.id,
    imports: [ SharedModule, routing ],
    declarations: [ HelpComponent ]
})
export class HelpModule {}
