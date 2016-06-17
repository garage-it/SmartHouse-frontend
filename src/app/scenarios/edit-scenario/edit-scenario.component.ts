import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';

const template = require('../scenario-details/scenario-details.html');
const style = require('../scenario-details/scenario-details.scss');
import {ScenarioDetailsComponent} from '../scenario-details/scenario-details.component';
import {ScenarioService} from '../Scenario.service';
import {ScenarioEditor} from '../scenario-editor/scenario-editor.component';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style],
    providers: [ScenarioService],
    directives: [ScenarioEditor, RouterLink]
})
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
