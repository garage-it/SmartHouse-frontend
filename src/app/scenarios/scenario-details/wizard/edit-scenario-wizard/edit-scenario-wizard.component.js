import {Component} from '@angular/core';
import Rx from 'rxjs/Rx';
import {ROUTER_DIRECTIVES, RouteParams, Router} from '@angular/router';
import template from './edit-scenario-wizard.html';
import {CreateScenarioWizardComponent}
    from '../create-scenario-wizard/create-scenario-wizard.component.js';
import {ScenarioService} from '../../../shared/Scenario.service.js';
import {DeviceListService} from '../../../../shared/device-list/device-list.service';
import Condition from '../scenario-entities/Condition';
import Action from '../scenario-entities/Action';
import Scenario from '../scenario-entities/Scenario';
import {ScenarioWizardComponent} from '../scenario-wizard/scenario-wizard.component';

@Component({
    template,
    providers: [ScenarioService, DeviceListService],
    directives: [ROUTER_DIRECTIVES, ScenarioWizardComponent]
})

export class EditScenarioWizardComponent extends CreateScenarioWizardComponent {

    constructor(scenarioService:ScenarioService,
                deviceListService: DeviceListService,
                routeParams:RouteParams,
                router: Router) {
        super(scenarioService, routeParams, router);

        this.deviceListService = deviceListService;
        this.scenarioService = scenarioService;
    }

    ngOnInit() {
        const deviceListStream = this.deviceListService.getSensors();
        const scenarioStream = this.scenarioService.get(this._routeParams.get('id'));
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
