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
    {path: '/', name: 'Dashboard', component: Dashboard, useAsDefault: true},
    {path: '/dashboard/editor', name: 'DashboardEditor', component: DashboardEditor},
    {path: '/device-list', name: 'DeviceList', component: DeviceList},
    {path: '/scenarios', name: 'ScenarioList', component: ScenarioListComponent},
    {path: '/help', name: 'Help', component: Help},
    {path: '/scenarios/create-editor', name: 'CreateScenarioEditor',
        component: CreateScenarioEditorComponent},
    {path: '/scenarios/create-wizard', name: 'CreateScenarioWizard',
        component: CreateScenarioWizardComponent},
    {path: '/scenario/editor/:id', name: 'EditScenarioEditor',
        component: EditScenarioEditorComponent},
    {path: '/scenario/wizard/:id', name: 'EditScenarioWizard',
        component: EditScenarioWizardComponent},
    {path: '/sensors/:id', name: 'SensorDetail', component: SensorDetail},
    {path: '/sensors/create', name: 'SensorDetail', component: SensorDetail}
];
