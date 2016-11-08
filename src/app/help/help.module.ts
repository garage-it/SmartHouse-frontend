import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { HelpComponent } from './help.component';
import { routing } from './help.routing';

@NgModule({
    id: module.id,
    imports: [ CoreModule, SharedModule, routing ],
    declarations: [ HelpComponent ]
})
export class HelpModule {}
