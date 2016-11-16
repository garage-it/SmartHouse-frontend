import { ScenarioListResolveService } from './scenario-list.resolve.service';

describe('scenario-list-resolve service', () => {
    let sut;
    let ScenarioService;

    beforeEach(() => {
        ScenarioService = jasmine.createSpyObj('ScenarioService', ['get']);
        sut = new ScenarioListResolveService(ScenarioService);
    });

    it('should call _scenarioService get method', () => {
        sut.resolve();
        expect(ScenarioService.get).toHaveBeenCalled();
    });
});
