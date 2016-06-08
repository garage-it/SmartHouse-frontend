import {ScenarioService} from './Scenario.service';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

describe('ScenarioService', () => {
    let scenariosData;
    let observable;
    let httpMock;
    let sut;

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
        let getScenariosResult;

        beforeEach(() => {
            getScenariosResult = sut.getScenarios();
        });

        it('should get scenarios data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/scenarios');
        });

        it('should return promise', (done) => {
            getScenariosResult.then(data => {
                expect(data).toEqual(scenariosData);

                done();
            });
        });
    });

    describe('Get scenarios without promise', () => {
        beforeEach(() => {
            sut.get();
        });

        it('should get scenarios data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/scenarios');
        });
    });

    describe('Get concrete scenario', () => {
        let getScenarioResult;
        const id = 123;

        beforeEach(() => {
            getScenarioResult = sut.getScenario(id);
        });

        it('should get scenario data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith(`/scenarios/${id}`);
        });

        it('should return promise', (done) => {
            getScenarioResult.then(data => {
                expect(data).toEqual(scenariosData);

                done();
            });
        });
    });

    describe('Create scenario', () => {
        let created;
        const scenario = {blabla: 'blabla'};

        beforeEach(() => {
            created = sut.createScenario(scenario);
        });

        it('should post scenario data to the server', () => {
            expect(httpMock.post).toHaveBeenCalledWith('/scenarios', scenario);
        });

        it('should return promise', (done) => {
            created.then(data => {
                expect(data).toEqual(scenariosData);

                done();
            });
        });
    });

    describe('Update scenario', () => {
        let updated;
        const id = 123;
        const scenario = {id};

        beforeEach(() => {
            updated = sut.updateScenario(scenario);
        });

        it('should put scenario data to the server', () => {
            expect(httpMock.put).toHaveBeenCalledWith(`/scenarios/${id}`, scenario);
        });

        it('should return promise', (done) => {
            updated.then(data => {
                expect(data).toEqual(scenariosData);

                done();
            });
        });
    });

    describe('Delete scenarios', () => {
        it('should be defined', () => {
            expect(sut.delete).toBeDefined();
        });

        it('should call this.http.delete', () => {
            sut.delete({ id: '111' });
            expect(httpMock.delete).toHaveBeenCalled();
        });

        it('should agregate route and scenario id', () => {
            sut.delete({ id: '111' });
            expect(httpMock.delete).toHaveBeenCalledWith('/scenarios/111');
        });
    });
});
