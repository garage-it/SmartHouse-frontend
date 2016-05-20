import {CreateScenarioComponent} from './create-scenario.component';
import {ScenarioService} from '../Scenario.service.js';
import {MockPromise} from '../../../../test/MockPromise';

describe('CreateScenarioComponent', () => {
    let scenarioService;
    let scenario;
    let sut;

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.createScenario.and.returnValue(new MockPromise(true));
        sut = new CreateScenarioComponent(scenarioService);
        spyOn(sut, 'back');
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should create scenario', () => {
            expect(scenarioService.createScenario).toHaveBeenCalledWith(scenario);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });
});
