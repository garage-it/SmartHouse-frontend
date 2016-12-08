import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScenarioService } from '../../../shared/scenario.service';
import { ScenarioDetailsComponent } from '../../scenario-details.component';

@Component({
    templateUrl: './create-scenario-editor.template.html',
    styleUrls: ['./scenario-editor.style.scss']
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
