import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

import {EditScenarioComponent} from './edit-scenario.component';
import {RouteParams} from 'angular2/router';
import {ScenarioService} from '../Scenario.service.js';

describe('EditScenarioComponent', () => {
    let scenarioService;
    let scenario;
    let sut;
    let routeParams;
    const id = 123;

    class ObservableSubscribe {
        constructor(data = {}) {
            this._data = data;
        }
        subscribe(fn) { return fn(this._data); }
    }

    class ScenarioServiceMock {
        get() { return new ObservableSubscribe(scenario); }
        update(data) { return new ObservableSubscribe(data); }
        delete(data) { return new ObservableSubscribe(data); }
    }

    class RouteParamsMock {
        get() {
            return id;
        }
    }

    beforeEachProviders(() => [
        provide(ScenarioService, {useClass: ScenarioServiceMock}),
        provide(RouteParams, {useClass: RouteParamsMock})
    ]);

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = new ScenarioServiceMock();
        routeParams = new RouteParamsMock();
        sut = new EditScenarioComponent(scenarioService, routeParams);

        spyOn(sut, 'back');
        spyOn(scenarioService, 'get').and.callThrough();
        spyOn(scenarioService, 'update').and.callThrough();
        spyOn(scenarioService, 'delete').and.callThrough();
    });

    it('should be "edit" mode', () => {
        expect(sut.scenarioDetailsMode).toEqual('edit');
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should fetch scenario with id from route params', () => {
            expect(scenarioService.get).toHaveBeenCalledWith(id);
        });

        it('should save fetched scenario', () => {
            expect(sut.scenario).toEqual(scenario);
        });
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should update scenario', () => {
            expect(scenarioService.update).toHaveBeenCalledWith(scenario);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });

    describe('Delete scenario', () => {
        it('should delete scenario', () => {
            sut.delete(scenario);
            expect(scenarioService.delete).toHaveBeenCalledWith(scenario);
        });

        it('should go back', () => {
            sut.delete(scenario);
            expect(sut.back).toHaveBeenCalled();
        });
    });
});
