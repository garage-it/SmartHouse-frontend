import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, provideRouter} from '@angular/router';

import {HeaderComponent} from './components/header/header.component';

import {Http, HTTP_PROVIDERS} from '@angular/http';
import ShHttpService from './shared/sh-http/sh-http.service.js';

import style from './app.scss';
import template from './app.html';
import routes from './routes';

@Component({
    selector: 'sh-app',
    directives: [ROUTER_DIRECTIVES, HeaderComponent],
    providers: [
        Http,
        HTTP_PROVIDERS,
        ShHttpService],
    styles: [style],
    template,
    encapsulation: ViewEncapsulation.None
})
export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
    }
}

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];
