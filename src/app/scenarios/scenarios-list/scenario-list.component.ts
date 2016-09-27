import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const template = require('./scenario-list.template.html');
const style = require('./scenario-list.style.scss');

import { ScenarioService } from './../shared/scenario.service';
import { ScenarioStatusService } from './scenario-status.service';


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
    styles: [style]
})
export class ScenarioListComponent {
    private scenarioList = [];
    private _headers = [];
    private subscription;

    constructor(protected scenarioService: ScenarioService,
                protected router: Router,
                protected scenarioStatusService: ScenarioStatusService,
                protected route: ActivatedRoute
    ) {
        this._headers = headersForDisplay;
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.scenarioList = data['scenarioList'].map(this.convertScenarioStatus);
        });

        this.subscription = this.scenarioStatusService['stream'].subscribe((event) =>
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
            ? 'scenarios/wizard'
            : 'scenarios/editor';
        this.router.navigate([route, scenario.id]);
    }

    convertScenarioStatus(scenario) {
        return Object.assign(scenario, {
            status: scenario.active ? SCENARIO_ACTIVE_STATE : SCENARIO_PAUSED_STATE
        });
    }
}
