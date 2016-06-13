import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

import {RouteParams} from 'angular2/router';
import {ScenarioService} from '../Scenario.service.js';
import {MockPromise} from '../../../../test/MockPromise';
import {EditScenarioEditorComponent} from './edit-scenario-editor.component';

describe('EditScenarioEditorComponent', () => {
    let scenarioService;
    let scenario;
    let sut;
    let routeParams;
    const id = 123;

    class ScenarioServiceMock {
        set reqStatForTest(status) {
            this._status = status;
        }
        getScenario() { return new MockPromise(true, scenario); }
        updateScenario() { return new MockPromise(true); }
        delete(data) {
            const status = this._status || 200;
            return {
                subscribe(fn) {
                    fn({ status, _body: JSON.stringify(data) });
                }
            };
        }
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
        sut = new EditScenarioEditorComponent(scenarioService, routeParams);

        spyOn(sut, 'back');
        spyOn(scenarioService, 'getScenario').and.callThrough();
        spyOn(scenarioService, 'updateScenario').and.callThrough();
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
            expect(scenarioService.getScenario).toHaveBeenCalledWith(id);
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
            expect(scenarioService.updateScenario).toHaveBeenCalledWith(scenario);
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

        it('should go back if everything fine', () => {
            sut.delete(scenario);
            expect(sut.back).toHaveBeenCalled();
        });

        it('should go back if request fails', () => {
            scenarioService.reqStatForTest = 404;
            sut.delete(scenario);
            expect(sut.back).not.toHaveBeenCalled();
        });
    });
});
