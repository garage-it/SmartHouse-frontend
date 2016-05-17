import {ScenarioService} from './Scenario.service.js';
import {ScenarioListComponent} from './scenarioList.component';

describe('ScenarioListComponent', () => {
    let scenarioService;
    let listData;
    let listDataPromise;
    let sut;

    beforeEach(() => {
        listData = [
            {value: 'testValue1'},
            {value: 'testValue2'}
        ];

        listDataPromise = Promise.resolve(listData);

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.getScenarios.and.returnValue(listDataPromise);

        sut = new ScenarioListComponent(scenarioService);
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
});
