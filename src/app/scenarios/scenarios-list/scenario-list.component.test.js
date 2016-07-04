import Rx from 'rxjs/Rx';
import {ScenarioService} from './../shared/Scenario.service.js';
import {ScenarioStatusService} from './scenario-status.service';
import {
    ScenarioListComponent,
    SCENARIO_ACTIVE_STATE,
    SCENARIO_PAUSED_STATE
} from './scenario-list.component.js';
import {Router, RouteParams} from '@angular/router';

import {beforeEachProviders} from '@angular/testing';
import {provide} from '@angular/core';

const mockScenario = {
    active: true
};
const mockScenarios = [mockScenario];

class ObservableSubscribe {
    constructor(data = {}) {
        this._data = data;
    }

    subscribe(fn) {
        return fn(this._data);
    }
}

class ScenarioServiceMock {
    get() {
        return new ObservableSubscribe(mockScenarios);
    }

    delete(data) {
        return new ObservableSubscribe(data);
    }

    update(data) {
        return new ObservableSubscribe(data);
    }
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
    navigate() {
    }
}

class ScenarioStatusServiceMock {
    constructor() {
        this.stream = new Rx.Subject();
    }
}

describe('ScenarioListComponent', () => {
    let sut;
    let scenarioService;
    let listData;
    let scenario;
    let router;
    let scenarioStatusService;

    beforeEachProviders(() => [
        provide(ScenarioService, { useClass: ScenarioServiceMock }),
        provide(RouteParams, { useClass: RouteParamsMock }),
        provide(Router, { useClass: RouterMock }),
        provide(ScenarioStatusService, {useClass: ScenarioStatusServiceMock})
    ]);

    beforeEach(() => {
        scenario = {
            id: 123
        };

        listData = [
            { id: '1', value: 'testValue1' },
            { id: '2', value: 'testValue2' }
        ];
        router = new RouterMock();

        scenarioService = new ScenarioServiceMock();
        scenarioStatusService = new ScenarioStatusServiceMock();
        sut = new ScenarioListComponent(scenarioService, router, scenarioStatusService);

        spyOn(scenarioService, 'get').and.callThrough();
        spyOn(scenarioService, 'delete').and.callThrough();
        spyOn(scenarioService, 'update').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should get scenarios', () => {
            expect(scenarioService.get).toHaveBeenCalled();
        });

        it('should set scenario status', () => {
            expect(mockScenario.status).toBe(SCENARIO_ACTIVE_STATE);
        });

        it('should update scenario status on event', () => {
            const pausedState = false;
            sut.scenarioList = listData;
            scenarioStatusService.stream.next({id: listData[1].id, active: pausedState});

            expect(sut.scenarioList[1].active).toBe(pausedState);
            expect(sut.scenarioList[1].status).toBe(SCENARIO_PAUSED_STATE);
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            sut.ngOnInit();
            spyOn(sut.subscription, 'unsubscribe');
            sut.ngOnDestroy();
        });

        it('should cancel subscription', () => {
            expect(sut.subscription.unsubscribe).toHaveBeenCalled();
        });
    });

    describe('#headers', () => {
        const allowedHeaders = [
            { topic: 'name', name: 'Name', sortable: true },
            { topic: 'active', name: 'Active', sortable: false },
            { topic: 'description', name: 'description', sortable: true }
        ];

        it('should have collection of allowed headers: name, active, description', () => {
            sut._headers = allowedHeaders;
            expect(sut.headers).toEqual(allowedHeaders);
        });
    });

    describe('#removeScenario', () => {
        it('should NOT call scenario service if user does not confirm scenario delete', () => {
            const mockedScenario = {id: 'mock'};
            spyOn(window, 'confirm').and.returnValue(false);
            sut.removeScenario(mockedScenario);

            expect(sut.scenarioService.delete).not.toHaveBeenCalledWith(mockedScenario);
        });

        describe('After user confirmation', () => {
            beforeEach(() => {
                spyOn(window, 'confirm').and.returnValue(true);
            });

            it('should call scenario service if user confirms scenario delete', () => {
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

        it('should set status when toggle scenario state', () => {
            sut.toggleScenarioState(mockedScenario);

            expect(mockedScenario.status).toBe(SCENARIO_ACTIVE_STATE);
        });
    });

    describe('#navigateToEditView', () => {
        it('should navigate to EditScenarioEditor', () => {
            scenario.isConvertable = false;
            sut.navigateToEditView(scenario);
            expect(sut.router.navigate)
                .toHaveBeenCalledWith(['EditScenarioEditor', { id: scenario.id }]);
        });

        it('should navigate to EditScenarioWizard', () => {
            scenario.isConvertable = true;
            sut.navigateToEditView(scenario);
            expect(sut.router.navigate)
                .toHaveBeenCalledWith(['EditScenarioWizard', { id: scenario.id }]);
        });
    });
});
