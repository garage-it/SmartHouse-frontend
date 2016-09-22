import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import template from './edit-scenario-wizard.template.html';

import { CreateScenarioWizardComponent }
    from '../create-scenario-wizard/create-scenario-wizard.component.js';

import { ScenarioService } from '../../../shared/scenario.service.js';
import { DeviceListService } from '../../../../devices/device-list/device-list.service';

import Condition from '../scenario-entities/condition';
import Action from '../scenario-entities/action';
import Scenario from '../scenario-entities/scenario';

import Rx from 'rxjs/Rx';

@Component({
    template
})
export class EditScenarioWizardComponent extends CreateScenarioWizardComponent {

    constructor(scenarioService:ScenarioService,
                deviceListService: DeviceListService,
                route:ActivatedRoute,
                router: Router) {
        super(scenarioService, route, router);

        this.deviceListService = deviceListService;
        this.scenarioService = scenarioService;
    }

    ngOnInit() {
        const deviceListStream = this.deviceListService.getSensors();
        const scenarioStream = this.scenarioService.get(this._route.snapshot.params.id);
        const source = Rx.Observable.forkJoin(
            deviceListStream, scenarioStream
        );

        source.subscribe(result => {
            const devices = result[0];
            const scenario = result[1];

            this.devices = devices;

            scenario.wizard = {
                logicalOperator: scenario.wizard && scenario.wizard.logicalOperator,
                conditions: mapConditions(this.devices, scenario.wizard.conditions),
                actions: mapActions(this.devices, scenario.wizard.actions)
            };
            this.scenario = new Scenario(scenario);
        });

        function mapConditions(devices, conditions) {
            return conditions.map((condition) => new Condition(devices, condition));
        }

        function mapActions(devices, actions) {
            return actions.map(action => new Action(devices, action));
        }
    }

    save(scenario) {
        this.scenarioService.update(scenario, true)
            .subscribe(() => {
                this.back();
            });
    }

    delete(scenario) {
        this.scenarioService
            .delete(scenario)
            .subscribe(data => {
                if (data.status === 200) {
                    this.back();
                }
            });
    }
}
