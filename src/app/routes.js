import {Home} from './home';
import {Dashboard} from './dashboard';
import {ScenarioListComponent, EditScenarioComponent, CreateScenarioComponent} from './scenarios/';
import {DeviceList} from './sensors/list';
import {SensorDetail} from './sensors/details';

export default [
    {path: '/', name: 'Index', component: Dashboard, useAsDefault: true, headerName: 'Smart House'},
    {path: '/home', name: 'Home', component: Home},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard, headerName: 'Dashboard'},
    {path: '/device-list', name: 'DeviceList', component: DeviceList, headerName: 'Devices'},
    {path: '/scenarios', name: 'ScenarioList', component: ScenarioListComponent,
     headerName: 'Scenarios'},
    {path: '/scenarios/create', name: 'CreateScenario', component: CreateScenarioComponent},
    {path: '/scenario/:id', name: 'EditScenario', component: EditScenarioComponent},
    {path: '/sensors/:id', name: 'SensorDetail', component: SensorDetail},
    {path: '/sensors/create', name: 'SensorDetail', component: SensorDetail}
];
