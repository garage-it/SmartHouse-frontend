import {CreateScenarioComponent} from './create-scenario.component';
import {ScenarioService} from '../Scenario.service.js';
import {DeviceListService} from '../../components/shared/device-list.service';
import {MockPromise} from '../../../../test/MockPromise';

describe('CreateScenarioComponent', () => {
    let scenarioService;
    let deviceListService;
    let scenario;
    let sut;

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };
        deviceListService = jasmine.createSpyComponent(DeviceListService);
        deviceListService.getSensors.and.returnValue({
            subscribe: jasmine.createSpy()
        });
        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.createScenario.and.returnValue(new MockPromise(true));
        sut = new CreateScenarioComponent(scenarioService, null, null, deviceListService);
        spyOn(sut, 'back');
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should fetch list of sensors', () => {
            sut.ngOnInit();
            expect(sut.deviceListService.getSensors).toHaveBeenCalled();
        });

        it('should create scenario', () => {
            expect(scenarioService.createScenario).toHaveBeenCalledWith(scenario);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });
});
