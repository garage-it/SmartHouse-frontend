// Styles
import './app/main.css';
import 'materialize-css/dist/css/materialize.css';
import 'dragula/dist/dragula.min.css';
import 'materialize-css/dist/js/materialize.js';

// Polyfills
import 'core-js';
import 'zone.js/dist/zone';

// Angular 2
import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/router';

// RxJS
import 'rxjs';

// Bootstrap
import { NgModule } from '@angular/core';
// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TranslateModule } from 'ng2-translate/ng2-translate';
import { DragulaModule } from 'ng2-dragula';

import { App, APP_DECLARATIONS } from './app/app';
import routes from './app/routes';

// bootstrap(App, [
//     APP_ROUTER_PROVIDERS,
//     provide(LocationStrategy, {useClass: HashLocationStrategy})
// ]);

@NgModule({
    declarations: [APP_DECLARATIONS],
    imports: [
        HttpModule, BrowserModule, FormsModule, ReactiveFormsModule, DragulaModule,
        // TranslateModule.forRoot(),
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
