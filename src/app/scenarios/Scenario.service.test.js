import {ScenarioService} from './Scenario.service';
import {Http} from 'angular2/http';
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
    const scenario = {
        id: 123,
        conditions: [condition],
        actions: [action],
        sourceType: 'WIZARD'
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
        let getScenarioResult;

        beforeEach(() => {
            getScenarioResult = sut.get(id);
        });

        it('should get scenario data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith(`/scenarios/${id}`);
        });
    });

    describe('Create scenario', () => {
        let created;
        const expectedScenario = {
            id,
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
            ],
            sourceType: 'WIZARD',
            isConvertible: true
        };
        const createScenario = Object.assign({}, scenario);
        beforeEach(() => {
            created = sut.create(createScenario);
        });

        it('should create scenario', () => {
            expect(httpMock.post).toHaveBeenCalledWith('/scenarios', expectedScenario);
        });
    });

    describe('Update scenario', () => {
        let updated;
        const expectedScenario = {
            id,
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
            ],
            sourceType: 'WIZARD',
            isConvertible: true
        };
        const updateScenario = Object.assign({}, scenario);


        it('should updated scenario', () => {
            updated = sut.update(updateScenario);
            expect(httpMock.put).toHaveBeenCalledWith(`/scenarios/${id}`, expectedScenario);
        });

        it('should not convert scenario if it was created in Editor', () => {
            const scenarioFromEditor = {
                id: 123,
                body: 'console.log(',
                name: 'scenario name',
                sourceType: 'EDITOR'
            };

            updated = sut.update(scenarioFromEditor);
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
