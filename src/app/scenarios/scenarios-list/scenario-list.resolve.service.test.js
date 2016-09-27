import {ScenarioListResolveService} from './scenario-list.resolve.service';
import {ScenarioService} from '../shared/scenario.service.js';

import {async, TestBed} from '@angular/core/testing';

const observableMock = {};

class ScenarioServiceMock {
    get() {
        return observableMock;
    }
}

describe('scenario-list-resolve service', () => {
    let sut;
    let scenarioService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ScenarioService, useClass: ScenarioServiceMock},
                ScenarioListResolveService
            ]
        })
        .compileComponents()
        .then(() => {
            scenarioService = TestBed.get(ScenarioService);
            sut = TestBed.get(ScenarioListResolveService);
            spyOn(scenarioService, 'get').and.callThrough();
        });
    }));

    it('should call scenarioService get method', () => {
        sut.resolve();
        expect(sut.scenarioService.get).toHaveBeenCalled();
    });
});
