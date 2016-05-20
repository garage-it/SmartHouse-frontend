import {EditScenarioComponent} from './edit-scenario.component';
import {RouteParams} from 'angular2/router';
import {ScenarioService} from '../Scenario.service.js';
import {MockPromise} from '../../../../test/MockPromise';

describe('EditScenarioComponent', () => {
    let scenarioService;
    let scenario;
    let sut;
    let routeParams;
    const id = 123;

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        routeParams = jasmine.createSpyComponent(RouteParams);
        scenarioService.getScenario.and.returnValue(new MockPromise(true, scenario));
        scenarioService.updateScenario.and.returnValue(new MockPromise(true));
        routeParams.get.and.returnValue(id);

        sut = new EditScenarioComponent(scenarioService, routeParams);
        spyOn(sut, 'back');
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
});
