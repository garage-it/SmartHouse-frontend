import {Component} from 'angular2/core';
import {Router, RouterLink} from 'angular2/router';

import template from './scenarioList.html';
import style from './scenarioList.css';
import {ScenarioService} from './../Scenario.service.js';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style],
    directives: [RouterLink],
    providers: [ScenarioService]
})

export class ScenarioListComponent {
    constructor(scenarioService: ScenarioService, router: Router) {
        this.scenarioService = scenarioService;
        this._router = router;
    }

    ngOnInit() {
        this.asyncScenarioList = this.scenarioService.getScenarios();
        this.asyncScenarioList.then(data => {
            this.scenarioList = data;
        });
    }

    openScenario(scenario) {
        this._router.navigate(['/EditScenario', {id: scenario.id}]);
    }
}
