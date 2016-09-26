import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const template = require('./create-scenario-editor.template.html');
const style = require('./scenario-editor.style.scss');

import { ScenarioService } from '../../../shared/scenario.service';
import { ScenarioDetailsComponent } from '../../scenario-details.component';

@Component({
    template,
    styles: [style]
})
export class CreateScenarioEditorComponent extends ScenarioDetailsComponent {

    constructor(_scenarioService: ScenarioService, _route: ActivatedRoute, _router: Router) {
        super(_scenarioService, _route, _router);
    }

    save(scenario) {
        this._scenarioService.create(scenario)
            .subscribe(() => this.back());
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario['body'] = scenarioBody;
    }
}
