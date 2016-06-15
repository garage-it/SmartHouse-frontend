import {CreateScenarioEditorComponent} from './create-scenario-editor.component';
import {ScenarioService} from '../Scenario.service.js';

describe('CreateScenarioEditorComponent', () => {
    let scenarioService;
    let scenario;
    let sut;

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.create.and.returnValue({ subscribe(fn) { fn(); } });
        sut = new CreateScenarioEditorComponent(scenarioService);
        spyOn(sut, 'back');
    });

    it('should be "create" mode', () => {
        expect(sut.scenarioDetailsMode).toEqual('create');
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
