import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';

import {Home} from './home';
import {Dashboard} from './dashboard';
import {DeviceList} from './components/device-list';
import {ListComponent} from './list';

import exampleRest from './example.rest.js';
import style from './app.scss';

@Component({
    selector: 'sh-app',
    directives: [RouterLink, RouterOutlet],
    styles: [style],
    template: `
      <h1>Smart House</h1>
      <nav>
        <a [routerLink]="['Home']">Home</a>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['List']">List</a>
        <a [routerLink]="['DeviceList']">Device List</a>
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
    {path: '/list', name: 'List', component: ListComponent}
])

export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
        exampleRest();
    }
}
