import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';

import template from './scenario-details.html';
import style from './scenario-details.scss';
import {ScenarioService} from '../Scenario.service.js';
import {ScenarioEditor} from '../scenario-editor/scenario-editor.component.js';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style],
    providers: [ScenarioService],
    directives: [ScenarioEditor, RouterLink]
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
