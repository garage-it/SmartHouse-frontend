import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const template = require('./scenario-details.template.html');
const style = require('./scenario-details.style.scss');

import { ScenarioService } from '../shared/scenario.service';
import { Scenario } from '../scenario-details/wizard/scenario-entities/scenario';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style]
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
