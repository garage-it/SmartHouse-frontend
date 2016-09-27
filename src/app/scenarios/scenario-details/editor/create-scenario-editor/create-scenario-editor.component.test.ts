import { CreateScenarioEditorComponent } from './create-scenario-editor.component';
import { ScenarioService } from '../../../shared/scenario.service';

describe('CreateScenarioEditor', () => {
    let scenarioService;
    let scenario;
    let sut;

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.create.and.returnValue({ subscribe(fn) { fn(); } });
        sut = new CreateScenarioEditorComponent(scenarioService, null, null);
        spyOn(sut, 'back');
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should create scenario', () => {
            expect(scenarioService.create).toHaveBeenCalledWith(scenario);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });
});
