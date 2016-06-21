import {Help} from './help';
import {Dashboard} from './dashboard';
import {
    ScenarioDetailsComponent,
    ScenarioListComponent
} from './scenarios/';
import {DeviceList} from './sensors/list';
import {SensorDetail} from './sensors/details';

export default [
    {path: '/', name: 'Index', component: Dashboard, useAsDefault: true, headerName: 'Smart House'},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard, headerName: 'Dashboard'},

    {path: '/scenarios', name: 'ScenarioList', component: ScenarioListComponent,
        headerName: 'Scenarios'},
    {path: '/scenarios/create', name: 'ScenarioCreate',
        component: ScenarioDetailsComponent},
    {path: '/scenario/:id', name: 'ScenarioDetails', component: ScenarioDetailsComponent},

    {path: '/device-list', name: 'DeviceList', component: DeviceList, headerName: 'Devices'},
    {path: '/sensors/create', name: 'SensorCreate', component: SensorDetail},
    {path: '/sensors/:id', name: 'SensorDetail', component: SensorDetail},

    {path: '/help', name: 'Help', component: Help, headerName: 'Help'}
];
