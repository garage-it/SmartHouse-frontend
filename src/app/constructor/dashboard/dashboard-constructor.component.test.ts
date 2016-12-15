import { DashboardConstructorComponent } from './dashboard-constructor.component';

const device1 = {mqttId: 1};
const device2 = {mqttId: 2};
const mockSensors = [device1, device2];

describe('DashboardConstructor', () => {
    let sut;
    let ActivatedRoute;

    beforeEach(() => {
        ActivatedRoute = {
            snapshot: {
                data: {
                    sensors: mockSensors,
                    dashboard: {
                        devices: []
                    }
                }
            }
        };
        sut = new DashboardConstructorComponent(ActivatedRoute);
        sut.isDefaultChange = jasmine.createSpyObj('isDefaultChange', ['emit']);
    });

    describe('on init', () => {
        describe('when dashboard view is empty', () => {
            beforeEach(() => {
                sut.ngOnInit();
            });

            it('should receive devices from state', () => {
                expect(sut.sensors).toEqual(mockSensors);
            });

            it('should receive dashboard widgets from state', () => {
                expect(sut.widgets).toEqual([]);
            });
        });

        describe('when dashbord has some widgets', () => {
            beforeEach(() => {
                ActivatedRoute.snapshot.data.sensors = [device2];
                sut.ngOnInit();
            });

            it('should receive devices from state that is not active widgets', () => {
                expect(sut.sensors).toEqual([device2]);
            });
        });
    });

    describe('on add widget', () => {
        beforeEach(() => {
            sut.sensors = [device1];
            sut.onAddSensor(device1);
        });

        it('should add widget to dashboard', () => {
            expect(sut.widgets[0]).toEqual(device1);
        });

    });

    describe('on remove widget', () => {
        beforeEach(() => {
            sut.widgets = [device1];
            sut.onRemoveWidget(device1);
        });

        it('should remove widget from dashboard', () => {
            expect(sut.widgets.length).toEqual(0);
        });
    });

    describe('default', () => {
        const defaultView = 'Dashboard';

        beforeEach(() => {
            sut.isDefault = defaultView;
        });

        it('should emit changes when default radio is changed', () => {
            expect(sut.isDefaultChange.emit).toHaveBeenCalledWith(defaultView);
        });
    });
});
