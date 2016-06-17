import {RouteParams, Router} from 'angular2/router';

import {ScenarioDetailsComponent} from '../scenario-details/scenario-details.component';
import {ScenarioService} from '../Scenario.service';

export class EditScenarioComponent extends ScenarioDetailsComponent {
    scenarioDetailsMode = 'edit';

    constructor(scenarioListService:ScenarioService, routeParams:RouteParams, router: Router) {// eslint-disable-line
        super(scenarioListService, routeParams, router);
    }

    ngOnInit() {
        this._scenarioService.getScenario(this._routeParams.get('id'))
        .then((scenario) => {
            this.scenario = scenario;
        });
    }

    save(scenario) {
        this._scenarioService.updateScenario(scenario).then(() => this.back());
    }

    delete(scenario) {
        this._scenarioService
            .delete(scenario)
            .subscribe(data => {
                if (data.status === 200) {
                    this.back();
                }
            });
    }
}
