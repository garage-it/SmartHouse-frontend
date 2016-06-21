import Rx from 'rxjs/Rx';
import {Component} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import {DeviceListService} from '../../../components/shared/device-list.service';
import Action from './scenario-entities/Action';
import Condition from './scenario-entities/Condition';
import Scenario from './scenario-entities/Scenario';
import {ScenarioService} from '../../shared/Scenario.service.js';
import {ScenarioWizardComponent} from './scenario-wizard/scenario-wizard.component';

import template from './scenario-wizard-mega.component.html';

const selector = 'scenario-wizard-mega';

@Component({
    selector,
    template,
    providers: [ScenarioService, DeviceListService],
    directives: [RouterLink, ScenarioWizardComponent],
    inputs: ['wizard']
})

export class ScenarioWizardMegaComponent {

    constructor(scenarioListService:ScenarioService,
                routeParams:RouteParams,
                router: Router,
                deviceListService: DeviceListService) { // eslint-disable-line
        this.deviceListService = deviceListService;
    }

    ngOnInit() {
        const deviceListStream = this.deviceListService.getSensors();

        deviceListStream.subscribe(devices => {
            this.devices = devices;

            if (this.wizard){
                this.wizard = convert(this.wizard, devices);
            } else {
                this.wizard = create(devices);
            }
        });

    }

    onAddCriteria() {
        this.wizard.conditions.push(new Condition(this.devices));
    }

    onRemoveCriteria(index) {
        this.wizard.conditions.splice(index, 1);
    }

    onAddAction() {
        this.wizard.actions.push(new Action(this.devices));
    }

    onRemoveAction(index) {
        this.wizard.actions.splice(index, 1);
    }

    getRaw () {
        const logicalOperator = this.wizard.logicalOperator;
        const conditions = getConditions(this.wizard.conditions);
        const actions = getActions(this.wizard.actions);

        return {
            logicalOperator,
            conditions,
            actions
        };


        function getConditions(_conditions) {
            return _conditions.map(condition => ({
                device: condition.selectedDevice,
                condition: condition.selectedCondition,
                value: condition.value
            }));
        }

        function getActions(_actions) {
            return _actions.map(item => ({
                device: item.selectedDevice,
                value: item.value
            }));
        }
    }

}

function create(devices) {
    return {
        conditions: [new Condition(devices)],
        actions: [new Action(devices)]
    };
}

function convert(wizard, devices) {
    return {
        logicalOperator: wizard.logicalOperator,
        conditions: mapConditions(devices, wizard.conditions),
        actions: mapActions(devices, wizard.actions)
    };

    function mapConditions(devices, conditions) {
        return conditions.map((condition) => new Condition(devices, condition));
    }

    function mapActions(devices, actions) {
        return actions.map(action => new Action(devices, action));
    }
}

