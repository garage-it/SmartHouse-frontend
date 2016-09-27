import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DeviceListService } from '../../../../devices/device-list/device-list.service';

import { ScenarioService } from '../../../shared/scenario.service';

const template = require('./edit-scenario-wizard.template.html');

import { CreateScenarioWizardComponent }
    from '../create-scenario-wizard/create-scenario-wizard.component';

import { Condition } from '../scenario-entities/condition';
import { Action } from '../scenario-entities/action';
import { Scenario } from '../scenario-entities/scenario';

import { Observable } from 'rxjs/Rx';


@Component({
    template
})
export class EditScenarioWizardComponent extends CreateScenarioWizardComponent implements OnInit {

    constructor(
        _scenarioService: ScenarioService, _route: ActivatedRoute,
        _router: Router, deviceListService: DeviceListService
    ) {
        super(_scenarioService, _route, _router, deviceListService);
    }

    ngOnInit() {
        const deviceListStream = this.deviceListService.getSensors();
        const scenarioStream = this._scenarioService.get(this._route.snapshot.params['id']);
        const source = Observable.forkJoin(
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
        this._scenarioService.update(scenario, true)
            .subscribe(() => {
                this.back();
            });
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
