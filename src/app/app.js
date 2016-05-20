import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_PROVIDERS} from 'angular2/router';

import {Home} from './home';
import {Dashboard} from './dashboard';
import {DeviceList} from './components/device-list';
import {ScenarioListComponent} from './components/scenario-list';
import {ListComponent} from './list';
import {SensorDetail} from './sensor-detail';

import {Http, HTTP_PROVIDERS} from 'angular2/http';
import ShHttpService from './sh-http/sh-http.service.js';

import exampleRest from './example.rest.js';
import style from './app.scss';
import template from './app.html';

@Component({
    selector: 'sh-app',
    directives: [RouterLink, RouterOutlet],
    providers: [
        ROUTER_PROVIDERS,
        Http,
        HTTP_PROVIDERS,
        ShHttpService],
    styles: [style],
    template,
    encapsulation: ViewEncapsulation.None
})
@RouteConfig([
    {path: '/', name: 'Index', component: Home, useAsDefault: true},
    {path: '/home', name: 'Home', component: Home},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/device-list', name: 'DeviceList', component: DeviceList},
    {path: '/list', name: 'List', component: ListComponent},
    {path: '/sensors/:id', name: 'SensorDetail', component: SensorDetail},
    {path: '/sensors/create', name: 'SensorDetail', component: SensorDetail},
    {path: '/scenario-list', name: 'ScenarioList', component: ScenarioListComponent}
])
export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
        exampleRest();
    }
}
