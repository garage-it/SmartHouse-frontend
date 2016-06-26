import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import template from './scenario-list.html';
import style from './scenario-list.scss';
import {ScenarioService} from './../shared/Scenario.service.js';

const selector = 'scenario-list';
const headersForDisplay = [
    { topic: 'name', name: 'Name', sortable: true },
    { topic: 'status', name: 'Status', sortable: false }
];
export const SCENARIO_ACTIVE_STATE = 'active';
export const SCENARIO_PAUSED_STATE = 'paused';

@Component({
    selector,
    template,
    styles: [style],
    directives: [RouterLink],
    providers: [ScenarioService]
})

export class ScenarioListComponent {
    scenarioList = [];
    _headers = [];

    constructor(scenarioService:ScenarioService, router:Router) {
        this.scenarioService = scenarioService;
        this._headers = headersForDisplay;
        this.router = router;
    }

    ngOnInit() {
        this.scenarioService
            .get()
            .subscribe(data => {
                this.scenarioList = data.map(this.convertScenarioStatus);
            });
    }

    get headers() {
        return this._headers;
    }

    removeScenario(item) {
        this.scenarioService
            .delete(item)
            .subscribe(data => {
                this.scenarioList = this.scenarioList
                    .filter(elem => elem.id !== data.id);
            });
    }

    toggleScenarioState(scenario) {
        const active = !scenario.active;
        const scenarioForUpdate = Object.assign({}, scenario, { active });
        this.scenarioService
            .update(scenarioForUpdate)
            .subscribe(() => {
                Object.assign(scenario, {
                    active: !scenario.active
                });
                this.convertScenarioStatus(scenario);
            });
    }

    navigateToEditView(scenario) {
        const route = scenario.isConvertable
            ? 'EditScenarioWizard'
            : 'EditScenarioEditor';
        this.router.navigate([route, { id: scenario.id }]);
    }

    convertScenarioStatus(scenario) {
        return Object.assign(scenario, {
            status: scenario.active ? SCENARIO_ACTIVE_STATE : SCENARIO_PAUSED_STATE
        });
    }
}
