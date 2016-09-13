// Styles
import './app/main.css';
import 'materialize-css/dist/css/materialize.css';
// import 'dragula/dist/dragula.min.css';
import 'materialize-css/dist/js/materialize.js';

// Polyfills
import 'core-js';
import 'zone.js/dist/zone';

// Angular 2
import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs';

// Import App dependencies: @TODO: move to ngMomodule for rc>4
import AppDependencies from './app/app.dependencies';

// Bootstrap
import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { App, APP_ROUTER_PROVIDERS } from './app/app';

bootstrap(App, [
    APP_ROUTER_PROVIDERS,
    ...AppDependencies,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
