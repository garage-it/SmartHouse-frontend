import {Injectable} from 'angular2/core';
import ShHttpService from '../sh-http/sh-http.service.js';

// TODO: let's use 'streams' approach. All promises functions should be
// removed in future after refactoring
@Injectable()
export class ScenarioService {
    constructor(http: ShHttpService) {
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
        return this.update(scenario).toPromise();
    }

    update(scenario) {
        return this.http.put(`/scenarios/${scenario.id}`, scenario);
    }

    createScenario(scenario) {
        return this.http.post('/scenarios', scenario).toPromise();
    }

    delete(scenario) {
        return this.http.delete(`/scenarios/${scenario.id}`);
    }
}
