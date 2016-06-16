import {Component} from 'angular2/core';
import Rx from 'rxjs/Rx';
import {RouteParams, RouterLink, Router} from 'angular2/router';
import template from './edit-scenario-wizard.html';
import {CreateScenarioWizardComponent}
    from '../create-scenario-wizard/create-scenario-wizard.component';
import {ScenarioService} from '../Scenario.service.js';
import {DeviceListService} from '../../components/shared/device-list.service';
import Condition from '../scenario-entities/Condition';
import Action from '../scenario-entities/Action';
import Scenario from '../scenario-entities/Scenario';
import LogicalOperator from '../scenario-entities/LogicalOperator';
import {ScenarioWizardComponent} from '../../components/scenario-wizard/scenario-wizard.component';

@Component({
    template,
    providers: [ScenarioService, DeviceListService],
    directives: [RouterLink, ScenarioWizardComponent]
})

export class EditScenarioWizardComponent extends CreateScenarioWizardComponent {
    scenarioDetailsMode = 'edit';

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
            this.devices = result[0];
            const scenario = result[1];
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
        this.scenarioService.update(scenario)
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
