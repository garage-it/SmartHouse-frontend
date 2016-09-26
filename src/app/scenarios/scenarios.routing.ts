import { RouterModule } from '@angular/router';

import {
    CreateScenarioEditorComponent
} from './scenario-details/editor/create-scenario-editor/create-scenario-editor.component';
import {
    EditScenarioEditorComponent
} from './scenario-details/editor/edit-scenario-editor/edit-scenario-editor.component';
import {
    CreateScenarioWizardComponent
} from './scenario-details/wizard/create-scenario-wizard/create-scenario-wizard.component';
import {
    EditScenarioWizardComponent
} from './scenario-details/wizard/edit-scenario-wizard/edit-scenario-wizard.component';
import { ScenarioListComponent } from './scenarios-list/scenario-list.component';

import { ScenarioListResolveService } from './scenarios-list/scenario-list.resolve.service';

export const routes = [
    {
        path: '',
        children: [
            {
                path: '', component: ScenarioListComponent,
                resolve: {scenarioList: ScenarioListResolveService}
            },
            {
                path: 'editor-create',
                component: CreateScenarioEditorComponent
            },
            {
                path: 'wizard-create',
                component: CreateScenarioWizardComponent
            },
            {
                path: 'editor/:id',
                component: EditScenarioEditorComponent
            },
            {
                path: 'wizard/:id',
                component: EditScenarioWizardComponent
            },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
