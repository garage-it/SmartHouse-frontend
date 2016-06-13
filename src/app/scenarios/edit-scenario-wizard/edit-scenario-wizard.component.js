import {RouteParams, Router} from 'angular2/router';

import {CreateScenarioWizardComponent}
    from '../create-scenario-wizard/create-scenario-wizard.component';
import {ScenarioService} from '../Scenario.service.js';
import {DeviceListService} from '../../components/shared/device-list.service';
import Condition from '../scenario-entities/Condition';
import Action from '../scenario-entities/Action';
import Scenario from '../scenario-entities/Scenario';
import LogicalOperator from '../scenario-entities/LogicalOperator';

export class EditScenarioWizardComponent extends CreateScenarioWizardComponent {
    scenarioDetailsMode = 'edit';

    constructor(scenarioListService:ScenarioService,
                routeParams:RouteParams,
                router: Router,
                deviceListService: DeviceListService) {// eslint-disable-line
        super(scenarioListService, routeParams, router);

        this.deviceListService = deviceListService;
    }

    ngOnInit() {
        const getDeviceListPromise = this.deviceListService.getSensors().toPromise();
        const getScenarioPromise = this._scenarioService.getScenario(this._routeParams.get('id'));
        Promise.all([getDeviceListPromise, getScenarioPromise])
            .then(data => {
                this.devices = data[0];
                const scenario = data[1];
                const conditions = this.mapConditions(this.devices, scenario.conditions);
                const actions = this.mapActions(this.devices, scenario.actions);
                const logicalOperators = LogicalOperator;
                this.scenario = new Scenario(conditions, actions, logicalOperators, scenario);
            });
    }

    mapConditions(devices, conditions) {
        return conditions.map((condition) => new Condition(devices, condition));
    }

    mapActions(devices, actions) {
        return actions.map(action => new Action(devices, action));
    }

    save(scenario) {
        this._scenarioService.updateScenario(scenario).then(() => this.back());
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
