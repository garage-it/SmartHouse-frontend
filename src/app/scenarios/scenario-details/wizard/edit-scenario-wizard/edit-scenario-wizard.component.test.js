import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EditScenarioWizardComponent} from './edit-scenario-wizard.component.js';
import {RouteParams} from 'angular2/router';
import {ScenarioService} from '../../../shared/Scenario.service.js';

import {DeviceListService} from '../../../../components/shared/device-list.service';
import Scenario from '../scenario-entities/Scenario';
import Condition from '../scenario-entities/Condition';
import Action from '../scenario-entities/Action';

describe('EditScenarioWizardComponent', () => {
    let scenarioService;
    let deviceListService;
    let sut;
    let routeParams;
    const id = 123;
    const expectedDevices = [
        'device1', 'device2'
    ];
    const scenario = {
        wizard: {
            conditions: ['cond1', 'cond2'],
            actions: ['action1', 'action2']
        }
    };

    class RouteParamsMock {
        get() {
            return id;
        }
    }

    class DeviceListServiceMock {
        getSensors() {
            return Observable.of(['device1', 'device2']);
        }
    }

    class ScenarioServiceMock {
        set reqStatForTest(status) {
            this._status = status;
        }

        get() {
            return Observable.of(scenario);
        }

        update() {
            return Observable.of(['device1', 'device2']);
        }

        delete(data) {
            const status = this._status || 200;
            return {
                subscribe(fn) {
                    fn({status, _body: JSON.stringify(data)});
                }
            };
        }
    }

    beforeEachProviders(() => [
        provide(DeviceListService, {useClass: DeviceListServiceMock}),
        provide(ScenarioService, {useClass: ScenarioServiceMock}),
        provide(RouteParams, {useClass: RouteParamsMock})
    ]);

    function mapConditions(devices, conditions) {
        return conditions.map((condition) => new Condition(devices, condition));
    }

    function mapActions(devices, actions) {
        return actions.map(action => new Action(devices, action));
    }

    beforeEach(() => {
        deviceListService = new DeviceListServiceMock();
        scenarioService = new ScenarioServiceMock();
        spyOn(scenarioService, 'get').and.callThrough();
        spyOn(scenarioService, 'update').and.callThrough();
        spyOn(scenarioService, 'delete').and.callThrough();
        routeParams = new RouteParamsMock();
        sut = new EditScenarioWizardComponent(
            scenarioService,
            deviceListService,
            routeParams,
            null
        );

        spyOn(sut, 'back');
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should get device list', () => {
            expect(sut.devices).toEqual(expectedDevices);
        });

        it('should fetch scenario with id from route params', () => {
            expect(scenarioService.get).toHaveBeenCalledWith(id);
        });

        it('should save fetched scenario', () => {
            const conditions = mapConditions(expectedDevices, scenario.wizard.conditions);
            const actions = mapActions(expectedDevices, scenario.wizard.actions);
            expect(sut.scenario)
                .toEqual(new Scenario({
                    wizard: {
                        logicalOperator: undefined,
                        conditions,
                        actions
                    }
                }));
        });
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should update scenario', () => {
            expect(scenarioService.update).toHaveBeenCalledWith(scenario, true);
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
