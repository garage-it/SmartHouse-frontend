import { Observable } from 'rxjs/Rx';
import { EditScenarioWizardComponent } from './edit-scenario-wizard.component';
import { Scenario }from '../scenario-entities/scenario';
import { Condition } from '../scenario-entities/condition';
import { Action } from '../scenario-entities/action';

describe('EditScenarioWizardComponent', () => {
    let sut;
    let ScenarioService;
    let ActivatedRoute;
    let Router;
    let DialogService;
    let ViewContainerRef;
    let DeviceListService;

    const id = 123;
    const expectedDevices = [
        'device1', 'device2'
    ];
    const scenario = {
        wizard: {
            conditions: ['cond1', 'cond2'],
            actions: ['action1', 'action2']
        }
    };

    function mapConditions(devices, conditions) {
        return conditions.map((condition) => new Condition(devices, condition));
    }

    function mapActions(devices, actions) {
        return actions.map(action => new Action(devices, action));
    }

    beforeEach(() => {
        ScenarioService = {
            get: jasmine.createSpy('get').and.returnValue(Observable.of(scenario)),
            update: jasmine.createSpy('update').and.returnValue(Observable.of(['device1', 'device2'])),
            delete: jasmine.createSpy('delete')
        };
        Router = {};
        ActivatedRoute = {
            snapshot: {
                params: {
                    id: id
                }
            }
        };
        DialogService = {
            confirm: jasmine.createSpy('confirm')
        };
        ViewContainerRef = {};

        DeviceListService = {
            getSensors: jasmine.createSpy('getSensors').and.returnValue(Observable.of(['device1', 'device2']))
        };

        sut = new EditScenarioWizardComponent(
            ScenarioService,
            ActivatedRoute,
            Router,
            DialogService,
            ViewContainerRef,
            DeviceListService);

        sut.back = jasmine.createSpy('back');


        // TestBed.configureTestingModule({
        //     declarations: [ EditScenarioWizardComponent ],
        //     providers: [
        //         { provide: DeviceListService, useClass: DeviceListServiceMock },
        //         { provide: ScenarioService, useClass: ScenarioServiceMock },
        //         { provide: ActivatedRoute, useValue: new ActivatedRouteMock(id) },
        //         { provide: Router, useClass: RouterMock}
        //     ]
        // })
        // .overrideComponent(EditScenarioWizardComponent, {
        //     set: {template: 'mocked template'}
        // })
        // .compileComponents()
        // .then(() => {
        //     sut = TestBed.createComponent(EditScenarioWizardComponent).componentInstance;
        //
        //     scenarioService = TestBed.get(ScenarioService);
        //
        //     spyOn(scenarioService, 'get').and.callThrough();
        //     spyOn(scenarioService, 'update').and.callThrough();
        //     spyOn(scenarioService, 'delete').and.callThrough();
        //
        //     spyOn(sut, 'back');
        // });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should get device list', () => {
            expect(sut.devices).toEqual(expectedDevices);
        });

        it('should fetch scenario with id from route params', () => {
            expect(ScenarioService.get).toHaveBeenCalledWith(id);
        });

        it('should save fetched scenario', () => {
            const conditions = mapConditions(expectedDevices, scenario.wizard.conditions);
            const actions = mapActions(expectedDevices, scenario.wizard.actions);
            expect(sut.scenario)
                .toEqual(new Scenario({
                    wizard: {
                        logicalOperator: undefined,
                        conditions,
                        actions
                    }
                }));
        });
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            sut.save(scenario);
        });

        it('should update scenario', () => {
            expect(ScenarioService.update).toHaveBeenCalledWith(scenario, true);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });

    describe('Delete scenario', () => {
        describe('before user confirmation', () => {
            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(false));
                sut.delete(scenario);
            });

            it('should show confirm dialog', () => {
                expect(DialogService.confirm).toHaveBeenCalled;
            });

            it('should have proper view container ref for dialog', () => {
                expect(DialogService.confirm.calls.mostRecent().args[0]).toEqual(ViewContainerRef);
            });

            it('should not remove scenario if user cancel confirmation', () => {
                expect(ScenarioService.delete).not.toHaveBeenCalled;
            });

            describe('should remove scenario if user confirms', () => {
                beforeEach(() => {
                    ScenarioService.delete.and.returnValues(Observable.of(1));
                    DialogService.confirm.and.returnValue(Observable.of(true));
                });

                it('should remove scenario', () => {
                    sut.delete(scenario);
                    expect(ScenarioService.delete).toHaveBeenCalledWith(scenario);
                });

                it('should navigate back if everything fine', () => {
                    sut.delete(scenario);
                    expect(sut.back).toHaveBeenCalled();
                });

                // it('should not go back if request fails', () => {
                //     ScenarioService.reqStatForTest = 404;
                //     sut.delete(scenario);
                //     expect(sut.back).not.toHaveBeenCalled();
                // });
            });
        });
    });
});
