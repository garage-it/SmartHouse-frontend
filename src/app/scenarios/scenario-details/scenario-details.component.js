import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import template from './scenario-details.template.html';
import style from './scenario-details.style.scss';

import { ScenarioService } from '../shared/scenario.service.js';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style]
})
export class ScenarioDetailsComponent {

    constructor(scenarioService:ScenarioService, route:ActivatedRoute, router: Router) {
        this._scenarioService = scenarioService;
        this._route = route;
        this._router = router;
        this.scenario = {};
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario.body = scenarioBody;
    }

    back() {
        this._router.navigate(['/scenarios']);
    }
}
