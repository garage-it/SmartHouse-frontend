import {RouteParams, Router} from 'angular2/router';

import {ScenarioDetailsComponent} from '../scenario-details/scenarioDetails.component';
import {ScenarioService} from '../Scenario.service.js';

export class EditScenarioComponent extends ScenarioDetailsComponent {
    constructor(scenarioListService:ScenarioService, routeParams:RouteParams, router: Router) {// eslint-disable-line
        super(scenarioListService, routeParams, router);
    }

    save(scenario) {
        this._scenarioService.updateScenario(scenario).then(() => this.back());
    }

    ngOnInit() {
        this._scenarioService.getScenario(this._routeParams.get('id'))
            .then((scenario) => {
                this.scenario = scenario;
            });
    }
}
