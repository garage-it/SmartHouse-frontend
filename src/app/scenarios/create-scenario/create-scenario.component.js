import {RouteParams, Router} from 'angular2/router';
import {DeviceListService} from '../../components/shared/device-list.service';
import {ScenarioDetailsComponent} from '../scenario-details/scenario-details.component';
import {ScenarioService} from '../Scenario.service.js';
import Action from '../Action';
import Condition from '../Condition';
import Scenario from '../Scenario';
export class CreateScenarioComponent extends ScenarioDetailsComponent {
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
                this.scenario = new Scenario(conditions, actions, '');
            });
    }

    save(scenario) {
        this._scenarioService.createScenario(scenario).then(() => this.back());
    }

    addCriteria() {
        this.scenario.conditions.push(new Condition(this.devices));
    }

    removeCriteria(index) {
        this.scenario.conditions.splice(index, 1);
    }

    addAction() {
        this.scenario.actions.push(new Action(this.devices));
    }

    removeAction(index) {
        this.scenario.actions.splice(index, 1);
    }
}
