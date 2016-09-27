import { ScenarioService } from '../shared/Scenario.service.js';
import { Observable } from 'rxjs/Observable';

export class ScenarioListResolveService {
    constructor(scenarioService: ScenarioService) {
        this.scenarioService = scenarioService;
    }

    resolve(): Observable<any> {
        return this.scenarioService.get();
    }
}
