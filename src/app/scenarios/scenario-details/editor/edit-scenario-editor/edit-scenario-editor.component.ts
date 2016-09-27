import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScenarioDetailsComponent } from '../../scenario-details.component';
import { ScenarioService } from '../../../shared/scenario.service';

const template = require('../../scenario-details.template.html');
const style = require('../../scenario-details.style.scss');

const selector = 'scenario-list';

@Component({
    selector,
    template,
    styles: [style]
})
export class EditScenarioEditorComponent extends ScenarioDetailsComponent implements OnInit {

    constructor(scenarioListService: ScenarioService, route: ActivatedRoute, router: Router) {
        super(scenarioListService, route, router);
    }

    ngOnInit() {
        this._scenarioService.get(this._route.snapshot.params['id'])
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

    isWizardAvailable() {
        return false;
    }
}
