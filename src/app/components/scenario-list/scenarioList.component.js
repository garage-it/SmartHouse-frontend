import {Component} from 'angular2/core';
import template from './scenarioList.html';
import style from './scenarioList.css';
import {ScenarioService} from './Scenario.service.js';

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style],
    providers: [ScenarioService]
})

export class ScenarioListComponent {
    constructor(scenarioService: ScenarioService) {
        this.scenarioService = scenarioService;
    }

    ngOnInit() {
        this.asyncScenarioList = this.scenarioService.getScenarios();
        this.asyncScenarioList.then(data => {
            this.scenarioList = data;
        });
    }
}
