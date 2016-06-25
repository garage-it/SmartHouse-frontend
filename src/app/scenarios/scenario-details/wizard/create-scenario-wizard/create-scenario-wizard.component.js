import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import template from './create-scenario-wizard.html';
import {DeviceListService} from '../../../../components/shared/device-list.service';
import Action from '../scenario-entities/Action';
import Condition from '../scenario-entities/Condition';
import Scenario from '../scenario-entities/Scenario';
import {ScenarioDetailsComponent} from '../../scenario-details.component';
import {ScenarioService} from '../../../shared/Scenario.service.js';
import {ScenarioWizardComponent} from '../scenario-wizard/scenario-wizard.component';

@Component({
    template,
    providers: [ScenarioService, DeviceListService],
    directives: [RouterLink, ScenarioWizardComponent]
})

export class CreateScenarioWizardComponent extends ScenarioDetailsComponent {

    constructor(scenarioListService:ScenarioService,
                routeParams:RouteParams,
                router: Router,
                deviceListService: DeviceListService) { // eslint-disable-line
        super(scenarioListService, routeParams, router);
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
