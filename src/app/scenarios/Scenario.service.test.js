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

    describe('Get scenarios', () => {
        beforeEach(() => {
            sut.get();
        });

        it('should get scenarios data from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/scenarios/');
        });
    });

    describe('Get concrete scenario', () => {
        const id = 123;

        it('should get scenario data from the server', () => {
            sut.get(id);
            expect(httpMock.get).toHaveBeenCalledWith(`/scenarios/${id}`);
        });
    });

    describe('Create scenario', () => {
        const scenario = {blabla: 'blabla'};

        it('should post scenario data to the server', () => {
            sut.create(scenario);
            expect(httpMock.post).toHaveBeenCalledWith('/scenarios', scenario);
        });
    });

    describe('Update scenario', () => {
        const scenario = { id: 123 };

        it('should put scenario data to the server', () => {
            sut.update(scenario);
            expect(httpMock.put).toHaveBeenCalledWith(`/scenarios/${scenario.id}`, scenario);
        });
    });

    describe('Update scenario without promise', () => {
        it('should update scenarios data from the server', () => {
            const mockedScenario = { id: 123 };
            sut.update(mockedScenario);
            expect(httpMock.put)
                .toHaveBeenCalledWith(`/scenarios/${mockedScenario.id}`, mockedScenario);
        });
    });

    describe('Delete scenarios', () => {
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
