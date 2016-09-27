import {Injectable} from '@angular/core';
import ShHttpService from '../../shared/sh-http/sh-http.service.js';

// TODO: let's use 'streams' approach. All promises functions should be
// removed in future after refactoring
@Injectable()
export class ScenarioService {
    constructor(http:ShHttpService) {
        this.http = http;
    }

    get(id = '') {
        return this.http.get(`/scenarios/${id}`);
    }

    update(scenario, isWizard) { // TODO: use separate service for mapping wizard
        return this.http.put(`/scenarios/${scenario.id}`, getScenario(scenario, isWizard));
    }

    create(scenario, isWizard) { // TODO: use separate service for mapping wizard
        return this.http.post('/scenarios', getScenario(scenario, isWizard));
    }

    delete(scenario) {
        return this.http.delete(`/scenarios/${scenario.id}`);
    }

}

function getScenario(scenario, isWizard) {
    return isWizard ? mapScenario(scenario) : cleanScenario(scenario);
}

function cleanScenario(scenario) {
    const result = Object.assign({}, scenario);
    delete result.sourceType;
    delete result.wizard;
    return result;
}

function mapScenario(scenario) {
    const logicalOperator = scenario.wizard.logicalOperator;
    const conditions = getConditions(scenario.wizard.conditions);
    const actions = getActions(scenario.wizard.actions);

    return Object.assign({}, scenario, {
        isConvertable: true,
        body: '',                   // <- erasing any existing script
        wizard: {
            logicalOperator,
            conditions,
            actions
        }
    });


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
