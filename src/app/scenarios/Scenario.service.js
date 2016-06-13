import {Injectable} from 'angular2/core';
import ShHttpService from '../sh-http/sh-http.service.js';

// TODO: let's use 'streams' approach. All promises functions should be
// removed in future after refactoring
@Injectable()
export class ScenarioService {
    constructor(http:ShHttpService) {
        this.http = http;
    }

    get() {
        return this.http.get('/scenarios');
    }

    getScenarios() {
        return this.get().toPromise();
    }

    getScenario(id) {
        return this.http.get(`/scenarios/${id}`).toPromise();
    }

    updateScenario(scenario) {
        return this.http.put(`/scenarios/${scenario.id}`, this.mapScenario(scenario)).toPromise();
    }

    createScenario(scenario) {
        return this.http.post('/scenarios', this.mapScenario(scenario)).toPromise();
    }

    delete(scenario) {
        return this.http.delete(`/scenarios/${scenario.id}`);
    }

    mapScenario(scenario) {
        if (scenario.sourceType === 'EDITOR') {
            return scenario;
        }

        const {conditions, actions} = scenario;
        return Object.assign(scenario, {
            conditions: this.getConditions(conditions),
            actions: this.getActions(actions),
            isConvertible: true
        });
    }

    getConditions(conditions) {
        return conditions.map(condition => {
            return {
                device: condition.selectedDevice,
                condition: condition.selectedCondition,
                value: condition.value
            };
        });
    }

    getActions(actions) {
        return actions.map((item) => {
            return {
                device: item.selectedDevice,
                value: item.value
            };
        });
    }
}
