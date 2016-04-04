import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

import {Home} from './home';

@Component({
    selector: 'sh-app'
})
@RouteConfig([
    { path: '/', name: 'Index', component: Home, useAsDefault: true }
])
export class App {

}
