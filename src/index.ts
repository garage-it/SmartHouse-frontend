// Styles
import './app/main.css';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';


// Polyfills
import 'core-js';
import 'zone.js/dist/zone';

// Angular 2
import 'angular2/platform/browser';
import 'angular2/platform/common_dom';
import 'angular2/core';
import 'angular2/common';
import 'angular2/http';
import 'angular2/router';

// RxJS
import 'rxjs';

// Bootstrap
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {HashLocationStrategy, LocationStrategy} from 'angular2/router';

import {App} from './app';

bootstrap(App, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
