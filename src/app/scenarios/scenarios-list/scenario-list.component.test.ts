import {ScenarioService} from './../Scenario.service';
import {ScenarioListComponent} from './scenario-list.component';

import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableSubscribe = {
    subscribe() {}
};

class ScenarioServiceMock {
    set reqStatForTest(status) {
        this._status = status;
    }
    get() { return observableSubscribe; }
    delete(data) {
        const status = this._status || 200;
        return {
            subscribe(fn) {
                fn({ status, _body: JSON.stringify(data) });
            }
        };
    }
}

describe('ScenarioListComponent', () => {
    let sut;
    let scenarioService;
    let listData;

    beforeEachProviders(() => [
        provide(ScenarioService, {useClass: ScenarioServiceMock})
    ]);

    beforeEach(() => {
        listData = [
            {id: '1', value: 'testValue1'},
            {id: '2', value: 'testValue2'}
        ];

        scenarioService = new ScenarioServiceMock();
        sut = new ScenarioListComponent(scenarioService);

        spyOn(scenarioService, 'get').and.callThrough();
        spyOn(scenarioService, 'delete').and.callThrough();
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should get scenarios', () => {
            expect(scenarioService.get).toHaveBeenCalled();
        });
    });

    describe('#headers', () => {
        const allowedHeaders = [
            { topic: 'name', name: 'Name', sortable: true },
            { topic: 'active', name: 'Active', sortable: false },
            { topic: 'description', name: 'description', sortable: true },
        ];

        it('should have collection of allowed headers: name, active, description', () => {
            sut._headers = allowedHeaders;
            expect(sut.headers).toEqual(allowedHeaders);
        });
    });

    describe('#removeScenario', () => {
        it('should call sensor service', () => {
            const mockedSensor = {_id: 'mock'};
            sut.removeScenario(mockedSensor);

            expect(sut.scenarioService.delete).toHaveBeenCalledWith(mockedSensor);
        });

        it('should remove sensor from listData if everything fine', () => {
            sut.scenarioList = listData;
            sut.removeScenario(listData[1]);

            expect(sut.scenarioList).toEqual([listData[0]]);
        });

        it('should not remove sensor from listData if request fails', () => {
            sut.scenarioList = listData;
            sut.scenarioService.reqStatForTest = 404;
            sut.removeScenario(listData[1]);

            expect(sut.scenarioList).toEqual(listData);
        });
    });
});
