import {CreateScenarioWizardComponent} from './create-scenario-wizard.component.js';
import {ScenarioService} from '../../../shared/Scenario.service.js';
import {DeviceListService} from '../../../../shared/device-list/device-list.service';
import Action from '../scenario-entities/Action';
import Condition from '../scenario-entities/Condition';
import Scenario from '../scenario-entities/Scenario';

describe('CreateScenarioWizardComponent', () => {
    let scenarioService;
    let deviceListService;
    let scenario;
    let devices;
    let subscribeHandler;
    let expectedScenario;
    let sut;

    function createScenario() {
        const conditions = [new Condition(devices)];
        const actions = [new Action(devices)];
        return new Scenario({ wizard: { conditions, actions }});
    }

    beforeEach(() => {
        scenario = {
            iam: 'a scenario'
        };
        devices = ['device1', 'device2'];

        scenarioService = jasmine.createSpyComponent(ScenarioService);
        scenarioService.create.and.returnValue({ subscribe(fn) { fn(); } });

        deviceListService = jasmine.createSpyComponent(DeviceListService);
        deviceListService.getSensors.and.returnValue({
            subscribe: (callback) => {
                subscribeHandler = callback;
            }
        });
        expectedScenario = createScenario();

        sut = new CreateScenarioWizardComponent(scenarioService, null, null, deviceListService);
        spyOn(sut, 'back');
    });

    describe('On Init', () => {
        it('get devices list', () => {
            sut.ngOnInit();
            expect(deviceListService.getSensors).toHaveBeenCalled();
        });

        it('should have scenario', () => {
            sut.ngOnInit();
            subscribeHandler(devices);
            expect(sut.scenario).toEqual(expectedScenario);
        });
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should create scenario', () => {
            expect(scenarioService.create).toHaveBeenCalledWith(scenario, true);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });

    describe('Scenario events', () => {
        beforeEach(() => {
            sut.ngOnInit();
            subscribeHandler(devices);
        });

        it('should add new condition when criteria is added', () => {
            sut.onAddCriteria();
            expect(sut.scenario.wizard.conditions.length).toEqual(2);
        });

        it('should remove condition when criteria is removed', () => {
            sut.onRemoveCriteria();
            expect(sut.scenario.wizard.conditions.length).toEqual(0);
        });

        it('should add new action when action is added', () => {
            sut.onAddAction();
            expect(sut.scenario.wizard.actions.length).toEqual(2);
        });

        it('should remove action when action is removed', () => {
            sut.onRemoveAction();
            expect(sut.scenario.wizard.actions.length).toEqual(0);
        });
    });
});
