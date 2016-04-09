import {Component} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import io from 'socket.io-client';

import {Home} from './home';
import {Dashboard} from './dashboard';

@Component({
    selector: 'sh-app',
    directives: [RouterLink, RouterOutlet],
    template: `
      <h1>Smart House</h1>
      <nav>
        <a [routerLink]="['Home']">Home</a>
        <a [routerLink]="['Dashboard']">Dashboard</a>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>`
})
@RouteConfig([
    {path: '/', name: 'Index', component: Home, useAsDefault: true},
    {path: '/home', name: 'Home', component: Home},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard}
])
export class App {
    ngOnInit() {
        io();
        console.log('Init App'); // eslint-disable-line
    }
}
