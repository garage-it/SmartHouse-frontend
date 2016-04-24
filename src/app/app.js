import {Component} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';

import {Home} from './home';
import {Dashboard} from './dashboard';
import {DeviceList} from './components/device-list';
import {ListComponent} from './list';

import exampleRest from './example.rest.js';
import template from './app.html';
import style from './app.css';

const selector = 'sh-app';

@Component({
    selector,
    directives: [RouterLink, RouterOutlet],
    styles: [style],
    template
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
