import { Subject, Observable } from 'rxjs/Rx';
import {
    ScenarioListComponent,
    SCENARIO_ACTIVE_STATE,
    SCENARIO_PAUSED_STATE
} from './scenario-list.component';

const mockScenario = {
    active: true
};
const mockScenarios = [mockScenario];

describe('ScenarioListComponent', () => {
    let sut;
    let ScenarioService;
    let Router;
    let ScenarioStatusService;
    let DialogService;
    let ActivatedRoute;
    let ViewContainerRef;

    const listData = [
        { id: '1', value: 'testValue1' },
        { id: '2', value: 'testValue2' }
    ];
    const scenario = {
        id: 123
    };

    beforeEach(() => {
        ScenarioService = jasmine.createSpyObj('ScenarioService', ['delete', 'update']);
        Router = jasmine.createSpyObj('Router', ['navigate']);
        ScenarioStatusService = {
            stream: new Subject()
        };
        ActivatedRoute = {
            data: Observable.of({scenarioList: mockScenarios})
        };
        DialogService = jasmine.createSpyObj('DialogService', ['confirm']);
        ViewContainerRef = {};

        spyOn(ActivatedRoute.data, 'subscribe').and.callThrough();
        sut = new ScenarioListComponent(
            ScenarioService,
            Router,
            ScenarioStatusService,
            ActivatedRoute,
            DialogService,
            ViewContainerRef
        );
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should receive scenarioList', () => {
            expect(sut.scenarioList).toEqual(mockScenarios);
        });

        it('should get data from activatedRoute', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set scenario status', () => {
            expect(mockScenario['status']).toBe(SCENARIO_ACTIVE_STATE);
        });

        describe('when event', () => {
            const pausedState = false;

            beforeEach(() => {
                sut.scenarioList = listData;
                ScenarioStatusService.stream.next({id: listData[1].id, active: pausedState});
            });

            it('should update scenario state', () => {
                expect(sut.scenarioList[1].active).toBe(pausedState);
            });

            it('should update scenario status', () => {
                expect(sut.scenarioList[1].status).toBe(SCENARIO_PAUSED_STATE);
            });
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            sut.ngOnInit();
            spyOn(sut.subscription, 'unsubscribe');
            sut.ngOnDestroy();
        });

        it('should cancel subscription', () => {
            expect(sut.subscription.unsubscribe).toHaveBeenCalled();
        });
    });

    describe('#toggleScenarioState', () => {
        let mockedScenario;

        beforeEach(() => {
            mockedScenario = { id: 'mock', active: false };
            ScenarioService.update.and.returnValue(Observable.of(mockedScenario));
            sut.toggleScenarioState(mockedScenario);
        });

        it('should toggle scenario state', () => {
            expect(mockedScenario.active).toBe(true);
        });

        it('should set status when toggle scenario state', () => {
            expect(mockedScenario.status).toBe(SCENARIO_ACTIVE_STATE);
        });
    });

    describe('#navigateToEditView', () => {
        it('should navigate to EditScenarioEditor', () => {
            scenario['isConvertable'] = false;
            sut.navigateToEditView(scenario);
            expect(Router.navigate)
                .toHaveBeenCalledWith(['scenarios/editor', scenario.id]);
        });

        it('should navigate to EditScenarioWizard', () => {
            scenario['isConvertable'] = true;
            sut.navigateToEditView(scenario);
            expect(Router.navigate)
                .toHaveBeenCalledWith(['scenarios/wizard', scenario.id]);
        });
    });

    describe('#headers', () => {
        const allowedHeaders = [
            { topic: 'name', name: 'Name', sortable: true },
            { topic: 'active', name: 'Active', sortable: false },
            { topic: 'description', name: 'description', sortable: true }
        ];

        it('should have collection of allowed headers: name, active, description', () => {
            sut._headers = allowedHeaders;
            expect(sut.headers).toEqual(allowedHeaders);
        });
    });

    describe('#removeScenario', () => {
        describe('before user confirmation', () => {
            const mockedScenario = {id: 'mock'};

            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(false));
                sut.removeScenario(mockedScenario);
            });

            it('should show confirm dialog', () => {
                const confirmOptions = {
                    title: '',
                    message: 'Are you sure you want to delete this scenario?'
                };

                expect(DialogService.confirm).toHaveBeenCalledWith(ViewContainerRef, confirmOptions);
            });

            it('should NOT call scenario service if user does not confirm scenario delete', () => {
                expect(ScenarioService.delete).not.toHaveBeenCalledWith(mockedScenario);
            });
        });

        describe('After user confirmation', () => {
            beforeEach(() => {
                sut.scenarioList = listData;
                DialogService.confirm.and.returnValue(Observable.of(true));
                ScenarioService.delete.and.returnValue(Observable.of(listData[1]));
                sut.removeScenario(listData[1]);
            });

            it('should call scenario service if user confirms scenario delete', () => {
                expect(ScenarioService.delete).toHaveBeenCalledWith(listData[1]);
            });

            it('should remove scenario from listData', () => {
                expect(sut.scenarioList).toEqual([listData[0]]);
            });
        });
    });
});
