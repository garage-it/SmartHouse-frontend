import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import template from './scenario-details.html';
import {ScenarioService} from '../Scenario.service.js';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    providers: [ScenarioService]
})

export class ScenarioDetailsComponent {
    constructor(scenarioService:ScenarioService, routeParams:RouteParams, router: Router) {
        this._scenarioService = scenarioService;
        this._routeParams = routeParams;
        this._router = router;
        this.scenario = {};
    }

    back() {
        this._router.navigate(['/ScenarioList']);
    }
}
