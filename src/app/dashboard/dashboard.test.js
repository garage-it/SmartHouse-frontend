import {Dashboard} from './dashboard';

let dashboardServiceCallback;
let sensorWidgetServiceCallback;
let sensorWidgetServiceDevice;

class DashboardServiceMock {
    getWidgets() {
        return {
            subscribe: (callback) => {
                dashboardServiceCallback = callback;
            }
        };
    }
}
class SensorWidgetServiceMock {
    subscribe(device, callback) {
        sensorWidgetServiceDevice = device;
        sensorWidgetServiceCallback = callback;
    }
}

describe('Dashboard', () => {
    let sut;
    let dashboardService;
    let sensorWidgetService;

    beforeEach(() => {
        dashboardService = new DashboardServiceMock();
        sensorWidgetService = new SensorWidgetServiceMock();
        sut = new Dashboard(dashboardService, sensorWidgetService);
    });

    describe('when initialize a component', () => {
        let sensor;
        let executor;
        let deviceList;

        beforeEach(() => {
            sensor = {device: {executor: false}};
            executor = {device: {executor: true}, hidden: false};
            deviceList = [sensor, executor];
            sut.ngOnInit();
        });

        it('should get device list', () => {
            dashboardServiceCallback({devices: deviceList});
            expect(sut.widgets).toEqual(deviceList);
        });

        it('should subscribe to socket events', () => {
            expect(sensorWidgetServiceDevice).toBeFalsy();
        });

        it('should add new widget if device-add event received', () => {
            sensorWidgetServiceCallback({event: 'device-add', data: 'faked'});
            expect(sut.widgets).toContain({
                device: 'faked',
                hidden: false
            });
        });
    });

    describe('isDashboardEmpty', () => {
        it('should show empty dashboard if there is no sensors and executors', () => {
            expect(sut.isDashboardEmpty()).toBe(true);
        });

        it('should hide empty state of dashboard if there is at least one device', () => {
            sut.widgets = [{}];
            expect(sut.isDashboardEmpty()).toBe(false);
        });
    });
});
