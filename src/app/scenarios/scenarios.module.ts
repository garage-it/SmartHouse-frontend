import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DevicesModule } from '../devices/shared/devices.module';

import { routing } from './scenarios.routing';

import { ScenarioListResolveService } from './scenarios-list/scenario-list.resolve.service';
import { ScenarioStatusService } from './scenarios-list/scenario-status.service';
import { ScenarioService } from './shared/scenario.service';

import SCENARIOS_DECLARATIONS from './scenarios.declarations';

@NgModule({
    id: module.id,
    imports: [
        RouterModule,
        FormsModule,
        SharedModule,
        DevicesModule,
        routing
    ],
    declarations: [ ...SCENARIOS_DECLARATIONS ],
    exports: [ ...SCENARIOS_DECLARATIONS ],
    providers: [
        ScenarioListResolveService,
        ScenarioStatusService,
        ScenarioService
    ]
})
export class ScenariosModule {}
