import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import template from './scenario-list.html';
import style from './scenario-list.scss';
import {ScenarioService} from './../shared/Scenario.service.js';
import {ScenarioStatusService} from './scenario-status.service';


const selector = 'scenario-list';
const headersForDisplay = [
    { topic: 'name', name: 'Name', sortable: true },
    { topic: 'status', name: 'Status', sortable: false }
];
export const SCENARIO_ACTIVE_STATE = 'active';
export const SCENARIO_PAUSED_STATE = 'paused';
const confirmQuestion = 'Are you sure you want to delete this scenario?';

@Component({
    selector,
    template,
    styles: [style],
    directives: [ROUTER_DIRECTIVES],
    providers: [ScenarioService, ScenarioStatusService]
})

export class ScenarioListComponent {
    scenarioList = [];
    _headers = [];

    constructor(scenarioService: ScenarioService, router:Router,
                scenarioStatusService: ScenarioStatusService) {
        this.scenarioService = scenarioService;
        this.scenarioStatusService = scenarioStatusService;
        this._headers = headersForDisplay;
        this.router = router;
    }

    ngOnInit() {
        this.scenarioService
            .get()
            .subscribe(data => {
                this.scenarioList = data.map(this.convertScenarioStatus);
            });

        this.subscription = this.scenarioStatusService.stream.subscribe((event) =>
            this.onScenarioStatusChange(event));
    }

    onScenarioStatusChange(event) {
        const scenarioToChange = this.scenarioList.find((scenario) => scenario.id === event.id);
        if (scenarioToChange) {
            scenarioToChange.active = event.active;
            this.convertScenarioStatus(scenarioToChange);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    get headers() {
        return this._headers;
    }

    removeScenario(item) {
        if (!window.confirm(confirmQuestion)) { // eslint-disable-line no-alert
            return;
        }

        this.scenarioService
            .delete(item)
            .subscribe(data => {
                this.scenarioList = this.scenarioList
                    .filter(elem => elem.id !== data.id);
            });
    }

    toggleScenarioState(scenario) {
        const active = !scenario.active;
        const scenarioForUpdate = Object.assign({}, scenario, {active});
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
