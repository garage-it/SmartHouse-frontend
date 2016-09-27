import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DeviceListModule } from '../devices/device-list/device-list.module';

import { routing } from './scenarios.routing';

import { ScenarioDetailsComponent } from './scenario-details/scenario-details.component';
import {
    CreateScenarioEditorComponent
} from './scenario-details/editor/create-scenario-editor/create-scenario-editor.component';
import {
    EditScenarioEditorComponent
} from './scenario-details/editor/edit-scenario-editor/edit-scenario-editor.component';
import {
    ScenarioEditorComponent
} from './scenario-details/editor/scenario-editor/scenario-editor.component';
import {
    CreateScenarioWizardComponent
} from './scenario-details/wizard/create-scenario-wizard/create-scenario-wizard.component';
import {
    EditScenarioWizardComponent
} from './scenario-details/wizard/edit-scenario-wizard/edit-scenario-wizard.component';
import {
    ScenarioWizardComponent
} from './scenario-details/wizard/scenario-wizard/scenario-wizard.component';
import {ScenarioListComponent} from './scenarios-list/scenario-list.component';

import { ScenarioListResolveService } from './scenarios-list/scenario-list.resolve.service';
import { ScenarioStatusService } from './scenarios-list/scenario-status.service';
import { ScenarioService } from './shared/scenario.service';


@NgModule({
    id: module.id,
    imports: [ RouterModule, FormsModule, SharedModule, routing, DeviceListModule ],
    declarations: [
        ScenarioDetailsComponent, CreateScenarioEditorComponent, EditScenarioEditorComponent,
        ScenarioEditorComponent, CreateScenarioWizardComponent, EditScenarioWizardComponent,
        ScenarioWizardComponent, ScenarioListComponent
    ],
    exports: [
        ScenarioDetailsComponent, CreateScenarioEditorComponent, EditScenarioEditorComponent,
        ScenarioEditorComponent, CreateScenarioWizardComponent, EditScenarioWizardComponent,
        ScenarioWizardComponent, ScenarioListComponent
    ],
    providers: [
        ScenarioListResolveService, ScenarioStatusService, ScenarioService
    ]
})
export class ScenariosModule {}
