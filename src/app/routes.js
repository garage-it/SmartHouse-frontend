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
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        useAsDefault: true
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'dashboard/editor',
        component: DashboardEditor
    },
    {
        path: 'devices',
        component: DeviceList
    },
    {
        path: 'devices/:id', component: SensorDetail
    },
    {
        path: 'devices-create', component: SensorDetail
    },
    {
        path: 'scenarios',
        component: ScenarioListComponent
    },
    {
        path: 'scenarios/editor-create',
        component: CreateScenarioEditorComponent
    },
    {
        path: 'scenarios/wizard-create',
        component: CreateScenarioWizardComponent
    },
    {
        path: 'scenarios/editor/:id',
        component: EditScenarioEditorComponent
    },
    {
        path: 'scenarios/wizard/:id',
        component: EditScenarioWizardComponent
    },
    {
        path: 'help',
        component: Help
    }
];
