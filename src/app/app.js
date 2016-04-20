import {Component} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';

import {Home} from './home';
import {Dashboard} from './dashboard';
import {DeviceList} from './components/device-list';

@Component({
    selector: 'sh-app',
    directives: [RouterLink, RouterOutlet],
    styles: [require('./app.css')],
    template: require('./app.html'),
})
@RouteConfig([
    {path: '/', name: 'Index', component: Home, useAsDefault: true},
    {path: '/home', name: 'Home', component: Home},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/device-list', name: 'DeviceList', component: DeviceList}
])
export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
    }
}
