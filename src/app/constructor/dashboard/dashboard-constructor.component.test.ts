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
                expect(sut.devices).toEqual(mockSensors);
            });

            it('should receive dashboard selected devices from state', () => {
                expect(sut.selectedDevices).toEqual([]);
            });
        });

        describe('when dashbord has some devices', () => {
            beforeEach(() => {
                ActivatedRoute.snapshot.data.sensors = [device2];
                sut.ngOnInit();
            });

            it('should receive devices from state that is not active devices', () => {
                expect(sut.devices).toEqual([device2]);
            });
        });
    });

    describe('on add device', () => {
        beforeEach(() => {
            sut.devices = [device1];
            sut.onAddDevice(device1);
        });

        it('should add device to list of selected devices', () => {
            expect(sut.selectedDevices[0]).toEqual(device1);
        });

    });

    describe('on remove device', () => {
        beforeEach(() => {
            sut.selectedDedvices = [device1];
            sut.onRemoveSelectedDevice(device1);
        });

        it('should remove device from list of selected devices', () => {
            expect(sut.selectedDevices.length).toEqual(0);
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
