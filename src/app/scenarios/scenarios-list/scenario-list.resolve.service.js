import { ScenarioService } from '../shared/scenario.service.js';

export class ScenarioListResolveService {
    constructor(scenarioService: ScenarioService) {
        this.scenarioService = scenarioService;
    }

    resolve() {
        return this.scenarioService.get();
    }
}
