import { DashboardConstructorComponent } from './dashboard-constructor.component';

const device1 = {mqttId: 1};
const device2 = {mqttId: 2};
const mockSensors = [device1, device2];

describe('DashboardConstructor', () => {
    let sut;

    beforeEach(() => {
        sut = new DashboardConstructorComponent();
        sut.defaultSubviewChange = jasmine.createSpyObj('defaultSubviewChange', ['emit']);
        sut.saveView = jasmine.createSpyObj('saveView', ['emit']);
        sut.dashboardSubview = {
            devices: []
        };
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
                sut.dashboardSubview = {
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

        it('should update dashboard subview', () => {
            expect(sut.dashboardSubview['devices']).toEqual(sut.selectedDevices);
        });

        it('should update dashboard subview', () => {
            expect(sut.dashboardSubview['devices']).toEqual(sut.selectedDevices);
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

        it('should update dashboard subview', () => {
            expect(sut.dashboardSubview['devices']).toEqual(sut.selectedDevices);
        });
    });

    describe('default', () => {
        const defaultView = 'Dashboard';

        beforeEach(() => {
            sut.defaultSubview = defaultView;
        });

        it('should emit changes when default radio is changed', () => {
            expect(sut.defaultSubviewChange.emit).toHaveBeenCalledWith(defaultView);
        });
    });

    describe('on submit', () => {
        it('should emit save view event', () => {
            sut.onSubmit();
            expect(sut.saveView.emit).toHaveBeenCalled();
        });
    });
});
