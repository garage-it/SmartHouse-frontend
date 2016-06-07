import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import template from './create-scenario-editor.html';

import {ScenarioDetailsComponent} from '../scenario-details/scenario-details.component';
import {ScenarioService} from '../Scenario.service.js';
import {ScenarioEditor} from '../scenario-editor/scenario-editor.component.js';

@Component({
    template,
    providers: [ScenarioService],
    directives: [ScenarioEditor, RouterLink]
})

export class CreateScenarioEditorComponent extends ScenarioDetailsComponent {
    constructor(scenarioListService:ScenarioService, routeParams:RouteParams, router: Router) { // eslint-disable-line
        super(scenarioListService, routeParams, router);
    }

    save(scenario) {
        this._scenarioService.createScenario(scenario).then(() => this.back());
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario.body = scenarioBody;
    }
}