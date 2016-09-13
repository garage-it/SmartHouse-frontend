import {Help} from './help';
import {Dashboard, DashboardEditor, DashboardResolveService} from './dashboard';
import {
    ScenarioListComponent,
    EditScenarioEditorComponent,
    EditScenarioWizardComponent,
    CreateScenarioEditorComponent,
    CreateScenarioWizardComponent,
    ScenarioListResolveService
} from './scenarios/';
import {DeviceList, SensorDetail, SensorDetailListResolveService} from './devices';


export default [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        useAsDefault: true
    },
    {
        path: 'dashboard',
        component: Dashboard,
        resolve: {
            devices: DashboardResolveService
        }
    },
    {
        path: 'dashboard/editor',
        component: DashboardEditor
    },
    {
        path: 'devices',
        component: DeviceList,
        resolve: {
            deviceList: SensorDetailListResolveService
        }
    },
    {
        path: 'devices/:id', component: SensorDetail
    },
    {
        path: 'devices-create', component: SensorDetail
    },
    {
        path: 'scenarios',
        component: ScenarioListComponent,
        resolve: {
            scenarioList: ScenarioListResolveService
        }
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
