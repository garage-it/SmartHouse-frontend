import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import template from './scenario-list.html';
import style from './scenario-list.scss';
import {ScenarioService} from './../Scenario.service.js';

const selector = 'scenario-list';
const headersForDisplay = [
    { topic: 'name', name: 'Name', sortable: true },
    { topic: 'active', name: 'Active', sortable: true },
    { topic: 'description', name: 'Description', sortable: true }
];

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

    constructor(scenarioService: ScenarioService) {
        this.scenarioService = scenarioService;
        this._headers = headersForDisplay;
    }

    ngOnInit() {
        this.scenarioService
            .get()
            .subscribe(data => {
                this.scenarioList = data;
            });
    }

    get headers() {
        return this._headers;
    }

    removeScenario(item) {
        this.scenarioService
            .delete(item)
            .subscribe(data => {
                const removedScenario = JSON.parse(data._body);

                if (data.status === 200) {
                    this.scenarioList = this.scenarioList
                        .filter(elem => elem.id !== removedScenario.id);
                }
            });
    }
}
