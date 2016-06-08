import {CreateScenarioWizardComponent} from './create-scenario-wizard.component';
import {ScenarioService} from '../Scenario.service.js';
import {MockPromise} from '../../../../test/MockPromise';

describe('CreateScenarioWizardComponent', () => {
    let scenarioService;
    let scenario;
    let sut;

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.createScenario.and.returnValue(new MockPromise(true));
        sut = new CreateScenarioWizardComponent(scenarioService);
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
