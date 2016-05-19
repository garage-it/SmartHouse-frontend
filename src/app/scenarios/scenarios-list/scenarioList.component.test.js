import {ScenarioService} from './../Scenario.service.js';
import {ScenarioListComponent} from './scenarioList.component.js';
import {Router} from 'angular2/router';

describe('ScenarioListComponent', () => {
    let scenarioService;
    let listData;
    let listDataPromise;
    let router;
    let sut;

    beforeEach(() => {
        listData = [
            {value: 'testValue1'},
            {value: 'testValue2'}
        ];

        listDataPromise = Promise.resolve(listData);

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        router = jasmine.createSpyComponent(Router);
        scenarioService.getScenarios.and.returnValue(listDataPromise);

        sut = new ScenarioListComponent(scenarioService, router);
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should get scenarios', () => {
            expect(scenarioService.getScenarios).toHaveBeenCalled();
        });

        it('should resolve promised list of scenarios', (done) => {
            scenarioService.getScenarios().then(() => {
                expect(sut.scenarioList).toEqual(listData);

                done();
            });
        });
    });

    describe('Open scenario', () => {
        it('will open scenario by id', () => {
            const id = 1;
            const scenario = {id};

            sut.openScenario(scenario);
            expect(router.navigate).toHaveBeenCalledWith(['/EditScenario', {id}]);
        });
    });
});
