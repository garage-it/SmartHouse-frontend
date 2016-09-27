import { Injectable } from '@angular/core';
import { ScenarioService } from '../shared/scenario.service';

@Injectable()
export class ScenarioListResolveService {
    constructor(private scenarioService: ScenarioService) {}

    resolve() {
        return this.scenarioService.get();
    }
}
