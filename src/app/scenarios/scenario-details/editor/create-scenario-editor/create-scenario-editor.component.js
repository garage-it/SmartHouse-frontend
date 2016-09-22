import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import template from './create-scenario-editor.template.html';
import style from './scenario-editor.style.scss';

import { ScenarioDetailsComponent } from '../../scenario-details.component';

import { ScenarioService } from '../../../shared/scenario.service.js';

@Component({
    template,
    styles: [style]
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
