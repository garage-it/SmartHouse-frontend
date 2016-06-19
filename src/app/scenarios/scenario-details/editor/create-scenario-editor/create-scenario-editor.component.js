import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import template from './create-scenario-editor.html';
import style from './scenario-editor.scss';

import {ScenarioDetailsComponent} from '../../scenario-details.component';
import {CreateScenarioWizardComponent} from
    '../../wizard/create-scenario-wizard/create-scenario-wizard.component';

import {ScenarioService} from '../../../shared/Scenario.service.js';
import {ScenarioEditor} from '../scenario-editor/scenario-editor.component.js';

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
        this._scenarioService.create(scenario)
            .subscribe(() => this.back());
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario.body = scenarioBody;
    }
}
