import {Help} from './help';
import {Dashboard, DashboardEditor} from './dashboard';
import {
    ScenarioListComponent,
    EditScenarioEditorComponent,
    EditScenarioWizardComponent,
    CreateScenarioEditorComponent,
    CreateScenarioWizardComponent
} from './scenarios/';
import {DeviceList, SensorDetail} from './devices';

export default [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', useAsDefault: true },
    { path: 'dashboard', component: Dashboard },
    { path: 'dashboard/editor', component: DashboardEditor },
    { path: 'devices', component: DeviceList },
    { path: 'scenarios', component: ScenarioListComponent },
    { path: 'help', component: Help },
    { path: 'scenarios/create-editor',
        component: CreateScenarioEditorComponent },
    { path: 'scenarios/create-wizard',
        component: CreateScenarioWizardComponent },
    { path: 'scenario/editor/:id',
        component: EditScenarioEditorComponent },
    { path: 'scenario/wizard/:id',
        component: EditScenarioWizardComponent },
    { path: 'sensors/:id', component: SensorDetail },
    { path: 'sensors/create', component: SensorDetail }
];
