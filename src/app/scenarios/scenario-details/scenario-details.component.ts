import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScenarioService } from '../shared/scenario.service';
import { Scenario } from '../scenario-details/wizard/scenario-entities/scenario';

@Component({
    selector: 'sh-scenario-list',
    templateUrl: './scenario-details.template.html',
    styleUrls: ['./scenario-details.style.scss']
})
export class ScenarioDetailsComponent {

    protected scenario: Scenario;

    // TODO remove route:ActivatedRoute to null
    constructor(
        protected _scenarioService: ScenarioService,
        protected _route: ActivatedRoute,
        protected _router: Router
    ) {
        this.scenario = new Scenario;
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario['body'] = scenarioBody;
    }

    back() {
        this._router.navigate(['/scenarios']);
    }
}
