import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DevicesService } from '../../../../devices/devices.service';

import { ScenarioService } from '../../../shared/scenario.service';
import { CreateScenarioWizardComponent } from '../create-scenario-wizard/create-scenario-wizard.component';

import { Condition } from '../scenario-entities/condition';
import { Action } from '../scenario-entities/action';
import { Scenario } from '../scenario-entities/scenario';

import { Observable } from 'rxjs/Rx';
import { DialogService } from '../../../../shared/dialog/dialog.service';

@Component({
    templateUrl: './edit-scenario-wizard.template.html'
})
export class EditScenarioWizardComponent extends CreateScenarioWizardComponent implements OnInit {

    constructor(
        protected _scenarioService: ScenarioService,
        protected _route: ActivatedRoute,
        protected _router: Router,
        protected dialogService: DialogService,
        protected viewContainerRef: ViewContainerRef,
        protected devicesService: DevicesService
    ) {
        super(_scenarioService, _route, _router, devicesService);
    }

    ngOnInit() {
        const deviceListStream = this.devicesService.getSensors();
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
        const confirmOptions = {
            title: '',
            message: 'Are you sure you want to delete this scenario?'
        };

        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(isConfirmed => isConfirmed)
            .subscribe(() => {
                this._scenarioService
                    .delete(scenario)
                    .subscribe(data => {
                        this.back();
                    });
            });
    }
}
