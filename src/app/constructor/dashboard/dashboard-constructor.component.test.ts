import { DashboardConstructorComponent } from './dashboard-constructor.component';

const device1 = {mqttId: 1};
const device2 = {mqttId: 2};
const mockSensors = [device1, device2];

describe('DashboardConstructor', () => {
    let sut;

    beforeEach(() => {
        sut = new DashboardConstructorComponent();
        sut.isDefaultChange = jasmine.createSpyObj('isDefaultChange', ['emit']);
    });

    describe('on init', () => {
        describe('when dashboard view is empty', () => {
            beforeEach(() => {
                sut.ngOnInit();
            });

            it('should selected devices be empty when create mode', () => {
                expect(sut.selectedDevices).toEqual([]);
            });

            it('should set existed devices to selected devices property when edit mode', () => {
                sut.dashboardSubViewData = {
                    devices: mockSensors
                };
                sut.ngOnInit();
                expect(sut.selectedDevices).toEqual(mockSensors);
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
