// Polyfills
import 'core-js';

// Zone.js
import 'zone.js/dist/zone';

// Angular 2
import 'angular2/platform/browser';
import 'angular2/platform/common_dom';
import 'angular2/core';
import 'angular2/common';
import 'angular2/http';
import 'angular2/router';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app';

bootstrap(App, [
    ...ROUTER_PROVIDERS
]);
