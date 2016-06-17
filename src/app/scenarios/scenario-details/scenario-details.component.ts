import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';

const template = require('./scenario-details.html');
const style = require('./scenario-details.scss');
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

export class ScenarioDetailsComponent {
    _scenarioService: any;
    _routeParams: any;
    _router: any;
    scenario: any;

    constructor(scenarioService:ScenarioService, routeParams:RouteParams, router: Router) {
        this._scenarioService = scenarioService;
        this._routeParams = routeParams;
        this._router = router;
        this.scenario = {};
    }

    onScenarioBodyUpdate({scenarioBody}) {
        this.scenario.body = scenarioBody;
    }

    back() {
        this._router.navigate(['/ScenarioList']);
    }
}
