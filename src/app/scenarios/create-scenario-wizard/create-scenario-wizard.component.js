import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import template from './create-scenario-wizard.html';
import {DeviceListService} from '../../components/shared/device-list.service';
import Action from '../scenario-entities/Action';
import Condition from '../scenario-entities/Condition';
import Scenario from '../scenario-entities/Scenario';
import LogicalOperator from '../scenario-entities/LogicalOperator';
import {ScenarioDetailsComponent} from '../scenario-details/scenario-details.component';
import {ScenarioService} from '../Scenario.service.js';
import {ScenarioWizardComponent} from '../../components/scenario-wizard/scenario-wizard.component';

@Component({
    template,
    providers: [ScenarioService, DeviceListService],
    directives: [RouterLink, ScenarioWizardComponent]
})

export class CreateScenarioWizardComponent extends ScenarioDetailsComponent {
    scenarioDetailsMode = 'create';

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
                const conditions = [new Condition(this.devices)];
                const actions = [new Action(this.devices)];
                const logicalOperators = LogicalOperator;
                this.scenario = new Scenario(conditions, actions, logicalOperators);
            });
    }

    onAddCriteria() {
        this.scenario.conditions.push(new Condition(this.devices));
    }

    onRemoveCriteria(index) {
        this.scenario.conditions.splice(index, 1);
    }

    onAddAction() {
        this.scenario.actions.push(new Action(this.devices));
    }

    onRemoveAction(index) {
        this.scenario.actions.splice(index, 1);
    }

    save(scenario) {
        this._scenarioService.createScenario(scenario).then(() => this.back());
    }
}
