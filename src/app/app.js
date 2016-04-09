import {Component} from 'angular2/core';
import {RouteConfig, RouterLink} from 'angular2/router';

import {Home} from './home';

@Component({
    selector: 'sh-app',
    directives: [RouterLink],
    template: `
      <h1>Smart House</h1>
      <nav>
        <a [routerLink]="['Home']">Home</a>
      </nav>
      <router-outlet></router-outlet>
    `
})
@RouteConfig([
    {path: '/', name: 'Home', component: Home, useAsDefault: true}
])
export class App {

}
