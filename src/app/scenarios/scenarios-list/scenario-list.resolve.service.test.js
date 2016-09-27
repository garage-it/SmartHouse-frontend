import { ScenarioListResolveService } from './scenario-list.resolve.service';
import { ScenarioService } from '../shared/Scenario.service.js';

import { beforeEachProviders } from '@angular/core/testing';
import { provide } from '@angular/core';

const observableMock = {};

class ScenarioServiceMock {
    get() { return observableMock; }
}

describe('scenario-list-resolve service', () => {
    let sut;
    let scenarioService;

    beforeEachProviders(() => [
        provide(ScenarioService, {useClass: ScenarioServiceMock})
    ]);

    beforeEach(() => {
        scenarioService = new ScenarioServiceMock();
        sut = new ScenarioListResolveService(scenarioService);

        spyOn(scenarioService, 'get').and.callThrough();
    });

    it('should call scenarioService get method', () => {
        sut.resolve();
        expect(sut.scenarioService.get).toHaveBeenCalled();
    });
});
