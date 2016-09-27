import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DeviceListService } from '../../../../devices/device-list/device-list.service';

import template from './create-scenario-wizard.template.html';

import { ScenarioDetailsComponent } from '../../scenario-details.component';
import { ScenarioService } from '../../../shared/scenario.service.js';

import Action from '../scenario-entities/action';
import Condition from '../scenario-entities/condition';
import Scenario from '../scenario-entities/scenario';


@Component({
    template
})

export class CreateScenarioWizardComponent extends ScenarioDetailsComponent {

    constructor(scenarioListService:ScenarioService,
                route:ActivatedRoute,
                router: Router,
                deviceListService: DeviceListService) { // eslint-disable-line
        super(scenarioListService, route, router);
        this.deviceListService = deviceListService;
    }

    ngOnInit() {
        this.deviceListService
            .getSensors()
            .subscribe(devices => {
                this.devices = devices;
                const newScenario = {
                    wizard: {
                        conditions: [new Condition(devices)],
                        actions: [new Action(devices)]
                    }
                };
                this.scenario = new Scenario(newScenario);
            });
    }

    onAddCriteria() {
        this.scenario.wizard.conditions.push(new Condition(this.devices));
    }

    onRemoveCriteria(index) {
        this.scenario.wizard.conditions.splice(index, 1);
    }

    onAddAction() {
        this.scenario.wizard.actions.push(new Action(this.devices));
    }

    onRemoveAction(index) {
        this.scenario.wizard.actions.splice(index, 1);
    }

    save(scenario) {
        this._scenarioService.create(scenario, true)
            .subscribe(() => this.back());
    }
}
