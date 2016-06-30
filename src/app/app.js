import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';

import {HeaderComponent} from './components/header/header.component';

import {Http, HTTP_PROVIDERS} from 'angular2/http';
import ShHttpService from './shared/sh-http/sh-http.service.js';

import style from './app.scss';
import template from './app.html';
import routes from './routes';

@Component({
    selector: 'sh-app',
    directives: [RouterLink, RouterOutlet, HeaderComponent],
    providers: [
        Http,
        HTTP_PROVIDERS,
        ShHttpService],
    styles: [style],
    template,
    encapsulation: ViewEncapsulation.None
})
@RouteConfig(routes)
export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
    }
}
