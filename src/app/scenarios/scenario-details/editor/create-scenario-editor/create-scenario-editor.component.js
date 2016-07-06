import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
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
    directives: [ROUTER_DIRECTIVES, ScenarioEditor, CreateScenarioWizardComponent]
})

export class CreateScenarioEditorComponent extends ScenarioDetailsComponent {

// TODO remove route:ActivatedRoute to null
    constructor(scenarioListService:ScenarioService, route:ActivatedRoute, router: Router) { // eslint-disable-line
        super(scenarioListService, route, router);
    }

    save(scenario) {
        this._scenarioService.create(scenario)
            .subscribe(() => this.back());
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario.body = scenarioBody;
    }
}
