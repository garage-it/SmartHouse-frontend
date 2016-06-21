import {Injectable} from 'angular2/core';
import ShHttpService from '../../sh-http/sh-http.service.js';

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

    update(scenario) {
        return this.http.put(`/scenarios/${scenario.id}`, scenario);
    }

    create(scenario) {
        return this.http.post('/scenarios', scenario);
    }

    delete(scenario) {
        return this.http.delete(`/scenarios/${scenario.id}`);
    }

}
