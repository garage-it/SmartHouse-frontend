import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_PROVIDERS} from 'angular2/router';

import {Home} from './home';
import {Dashboard} from './dashboard';
import {DeviceList} from './components/device-list';
import {ListComponent} from './list';
import {SensorDetail} from './sensor-detail';

import {Http, HTTP_PROVIDERS} from 'angular2/http';
import ShHttpService from './helpers/sh-http.service.js';

import exampleRest from './example.rest.js';
import style from './app.scss';

@Component({
    selector: 'sh-app',
    directives: [RouterLink, RouterOutlet],
    providers: [
        ROUTER_PROVIDERS,
        Http,
        HTTP_PROVIDERS,
        ShHttpService],
    styles: [style],
    template: `
      <h1>Smart House</h1>
      <nav>
        <a [routerLink]="['Home']">Home</a>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['List']">List</a>
        <a [routerLink]="['DeviceList']">Device List</a>
        <a [routerLink]="['SensorDetail', {id: '41224d776a326fb40f000001'}]">SensorDetail</a>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>`,
    encapsulation: ViewEncapsulation.None
})
@RouteConfig([
    {path: '/', name: 'Index', component: Home, useAsDefault: true},
    {path: '/home', name: 'Home', component: Home},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/device-list', name: 'DeviceList', component: DeviceList},
    {path: '/list', name: 'List', component: ListComponent},
    {path: '/sensors/:id', name: 'SensorDetail', component: SensorDetail}
])
export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
        exampleRest();
    }
}
