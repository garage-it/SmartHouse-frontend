import {ScenarioService} from './Scenario.service.js';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

describe('ScenarioService', () => {
    let scenariosData;
    let observable;
    let httpMock;
    let sut;
    const id = 123;
    const device = {
        mqttId: '3423'
    };
    const devices = [device];
    const condition = {
        selectedDevice: 'temp',
        selectedCondition: 'MORE_OR_EQUAL',
        value: 'some value',
        devices
    };
    const action = {
        selectedDevice: 'temp',
        devices,
        value: 'some value'
    };
    const LOGICAL_OPERATOR = 'OR';
    const scenario = {
        id: 123,
        wizard: {
            logicalOperator: LOGICAL_OPERATOR,
            conditions: [condition],
            actions: [action]
        }
    };

    beforeEach(() => {
        scenariosData = [
            {value: 'testValue1'},
            {value: 'testValue2'}
        ];

        observable = Observable.create(observer => {
            observer.next(scenariosData);
            observer.complete();
        });

        httpMock = jasmine.createSpyComponent(Http);
        const methods = ['post', 'put', 'get', 'delete'];
        methods.forEach((method) => httpMock[method].and.returnValue(observable));
    });

    beforeEach(() => {
        sut = new ScenarioService(httpMock);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    describe('Get scenarios with promise', () => {
        beforeEach(() => {
            sut.get();
        });

        it('should get scenarios data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/scenarios/');
        });
    });

    describe('Get scenarios without promise', () => {
        beforeEach(() => {
            sut.get();
        });

        it('should get scenarios data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/scenarios/');
        });
    });

    describe('Get concrete scenario', () => {
        beforeEach(() => {
            sut.get(id);
        });

        it('should get scenario data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith(`/scenarios/${id}`);
        });
    });

    describe('Create scenario', () => {
        it('should create scenario', () => {
            const expectedScenario = {
                id,
                body: '',
                isConvertable: true,
                wizard: {
                    logicalOperator: LOGICAL_OPERATOR,
                    conditions: [
                        {
                            device: condition.selectedDevice,
                            condition: condition.selectedCondition,
                            value: condition.value
                        }
                    ],
                    actions: [
                        {
                            device: action.selectedDevice,
                            value: action.value
                        }
                    ]
                }
            };
            const createScenario = Object.assign({}, scenario);

            sut.create(createScenario, true);
            expect(httpMock.post).toHaveBeenCalledWith('/scenarios', expectedScenario);
        });
    });

    describe('Update scenario', () => {
        it('should updated scenario', () => {
            const expectedScenario = {
                id,
                body: '',
                isConvertable: true,
                wizard: {
                    logicalOperator: LOGICAL_OPERATOR,
                    conditions: [
                        {
                            device: condition.selectedDevice,
                            condition: condition.selectedCondition,
                            value: condition.value
                        }
                    ],
                    actions: [
                        {
                            device: action.selectedDevice,
                            value: action.value
                        }
                    ]
                }
            };
            const updateScenario = Object.assign({}, scenario);


            sut.update(updateScenario, true);
            expect(httpMock.put).toHaveBeenCalledWith(`/scenarios/${id}`, expectedScenario);
        });

        it('should not convert scenario if it was created in Editor', () => {
            const scenarioFromEditor = {
                id: 123,
                body: 'console.log(',
                name: 'scenario name'
            };

            sut.update(scenarioFromEditor);
            expect(httpMock.put).toHaveBeenCalledWith(`/scenarios/${id}`, scenarioFromEditor);
        });
    });

    describe('Delete scenarios', () => {
        it('should call this.http.delete', () => {
            sut.delete({ id: '111' });
            expect(httpMock.delete).toHaveBeenCalled();
        });

        it('should aggregate route and scenario id', () => {
            sut.delete({ id: '111' });
            expect(httpMock.delete).toHaveBeenCalledWith('/scenarios/111');
        });
    });
});
