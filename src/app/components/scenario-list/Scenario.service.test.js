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
        httpMock.get.and.returnValue(observable);
    });

    beforeEach(() => {
        sut = new ScenarioService(httpMock);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get scenario data from the server', () => {
        sut.getScenarios();

        expect(httpMock.get).toHaveBeenCalledWith('/scenarios');
    });

    it('should return promise', (done) => {
        sut.getScenarios().then(data => {
            expect(data).toEqual(scenariosData);

            done();
        });
    });
});
