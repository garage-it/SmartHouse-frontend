import {beforeEachProviders} from '@angular/core/testing';
import {provide} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {ScenarioService} from '../../../shared/Scenario.service.js';
import {EditScenarioEditorComponent} from './edit-scenario-editor.component.js';

describe('EditScenarioEditorComponent', () => {
    let scenarioService;
    let scenario;
    let sut;
    let route;
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

    class ActivatedRouteMock {
        constructor(_id) {
            this.snapshot = {
                params: {id: _id}
            };
        }
    }

    beforeEachProviders(() => [
        provide(ScenarioService, {useClass: ScenarioServiceMock}),
        provide(ActivatedRoute, {useClass: ActivatedRouteMock})
    ]);

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = new ScenarioServiceMock();
        route = new ActivatedRouteMock(id);
        sut = new EditScenarioEditorComponent(scenarioService, route);

        spyOn(sut, 'back');
        spyOn(scenarioService, 'get').and.callThrough();
        spyOn(scenarioService, 'update').and.callThrough();
        spyOn(scenarioService, 'delete').and.callThrough();
    });

    it('should NOT allow switch to wizard', () => {
        expect(sut.isWizardAvailable()).toEqual(false);
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
