import {ScenarioService} from './../Scenario.service.js';
import {ScenarioListComponent} from './scenario-list.component.js';
import {Router, RouteParams} from 'angular2/router';

import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

class ObservableSubscribe {
    constructor(data = {}) {
        this._data = data;
    }
    subscribe(fn) { return fn(this._data); }
}

class ScenarioServiceMock {
    get() { return new ObservableSubscribe(); }
    delete(data) { return new ObservableSubscribe(data); }
    update(data) { return new ObservableSubscribe(data); }
}

class RouteParamsMock {
    constructor(id) {
        this.idMock = id;
    }

    get() {
        return this.idMock;
    }
}

class RouterMock {
    navigate() {}
}

describe('ScenarioListComponent', () => {
    let sut;
    let scenarioService;
    let listData;
    let scenario = {
        id: 123,
        sourceType: 'EDITOR'
    };
    let router;

    beforeEachProviders(() => [
        provide(ScenarioService, {useClass: ScenarioServiceMock}),
        provide(RouteParams, {useClass: RouteParamsMock}),
        provide(Router, {useClass: RouterMock})
    ]);

    beforeEach(() => {
        listData = [
            {id: '1', value: 'testValue1'},
            {id: '2', value: 'testValue2'}
        ];
        router = new RouterMock();

        scenarioService = new ScenarioServiceMock();
        sut = new ScenarioListComponent(scenarioService, router);

        spyOn(scenarioService, 'get').and.callThrough();
        spyOn(scenarioService, 'delete').and.callThrough();
        spyOn(scenarioService, 'update').and.callThrough();
        spyOn(router, 'navigate').and.callThrough()
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
            {topic: 'name', name: 'Name', sortable: true},
            {topic: 'active', name: 'Active', sortable: false},
            {topic: 'description', name: 'description', sortable: true},
        ];

        it('should have collection of allowed headers: name, active, description', () => {
            sut._headers = allowedHeaders;
            expect(sut.headers).toEqual(allowedHeaders);
        });
    });

    describe('#removeScenario', () => {
        it('should call scenario service', () => {
            const mockedScenario = {id: 'mock'};
            sut.removeScenario(mockedScenario);

            expect(sut.scenarioService.delete).toHaveBeenCalledWith(mockedScenario);
        });

        it('should remove scenario from listData', () => {
            sut.scenarioList = listData;
            sut.removeScenario(listData[1]);

            expect(sut.scenarioList).toEqual([listData[0]]);
        });
    });

    describe('#toggleScenarioState', () => {
        let mockedScenario;

        beforeEach(() => {
            mockedScenario = { id: 'mock', active: false };
        });

        it('should toggle scenario state', () => {
            sut.toggleScenarioState(mockedScenario);

            expect(mockedScenario.active).toBe(true);
        });
    });

    describe('#navigateToEditView', () => {
        it('should navigate to EditScenarioEditor', () => {
            sut.navigateToEditView(scenario);
            expect(sut.router.navigate).toHaveBeenCalledWith(['EditScenarioEditor', {id: scenario.id}]);
        });

        it('should navigate to EditScenarioWizard', () => {
            scenario.sourceType = 'WIZARD';
            sut.navigateToEditView(scenario);
            expect(sut.router.navigate).toHaveBeenCalledWith(['EditScenarioWizard', {id: scenario.id}]);
        });
    });
});
