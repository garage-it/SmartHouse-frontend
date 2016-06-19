import {RouteParams, Router} from 'angular2/router';

import {ScenarioDetailsComponent} from '../../scenario-details.component';
import {ScenarioService} from '../../../shared/Scenario.service.js';

export class EditScenarioEditorComponent extends ScenarioDetailsComponent {
    scenarioDetailsMode = 'edit';

    constructor(scenarioListService:ScenarioService, routeParams:RouteParams, router: Router) {// eslint-disable-line
        super(scenarioListService, routeParams, router);
    }

    ngOnInit() {
        this._scenarioService.get(this._routeParams.get('id'))
            .subscribe((scenario) => {
                this.scenario = scenario;
            });
    }

    save(scenario) {
        this._scenarioService.update(scenario)
            .subscribe(() => {
                this.back();
            });
    }

    delete(scenario) {
        this._scenarioService
            .delete(scenario)
            .subscribe(() => {
                this.back();
            });
    }
}
