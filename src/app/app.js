import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import ShHttpService from './shared/sh-http/sh-http.service.js';

import style from './app.scss';
import template from './app.html';

// Components:
import { HeaderComponent } from './components/header/header.component';
import { Help } from './help';
import {
    Dashboard,
    DashboardEditor,
    SensorWidget,
    SensorExecutorWidget,
    SensorStatusWidget
} from './dashboard';
import {
    ScenarioListComponent,
    ScenarioEditor,
    EditScenarioEditorComponent,
    EditScenarioWizardComponent,
    CreateScenarioEditorComponent,
    CreateScenarioWizardComponent,
    ScenarioWizardComponent
} from './scenarios/';
import {DeviceList, SensorDetail} from './devices';

@Component({
    selector: 'sh-app',
    directives: [ROUTER_DIRECTIVES],
    providers: [ ShHttpService ],
    styles: [style],
    template,
    encapsulation: ViewEncapsulation.None
})
export class App {
    ngOnInit() {
        console.log('Init App'); // eslint-disable-line
    }
}

export const APP_DECLARATIONS = [
    App,
    HeaderComponent,
    Help,
    Dashboard,
    DashboardEditor,
    SensorWidget,
    ScenarioListComponent,
    ScenarioEditor,
    SensorExecutorWidget,
    SensorStatusWidget,
    EditScenarioEditorComponent,
    EditScenarioWizardComponent,
    CreateScenarioEditorComponent,
    CreateScenarioWizardComponent,
    ScenarioWizardComponent,
    DeviceList,
    SensorDetail
];

// export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];
