import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
const template = require('./create-scenario-editor.html');
const style = require('./scenario-editor.scss');

import {ScenarioDetailsComponent} from '../scenario-details/scenario-details.component';
import {CreateScenarioWizardComponent} from
    '../create-scenario-wizard/create-scenario-wizard.component';

import {ScenarioService} from '../Scenario.service';
import {ScenarioEditor} from '../scenario-editor/scenario-editor.component';

@Component({
    template,
    styles: [style],
    providers: [ScenarioService],
    directives: [ScenarioEditor, RouterLink, CreateScenarioWizardComponent]
})

export class CreateScenarioEditorComponent extends ScenarioDetailsComponent {
    scenarioDetailsMode = 'create';

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
