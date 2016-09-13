import {Dashboard} from './dashboard';

let sensorWidgetServiceCallback;
let sensorWidgetServiceDevice;


class ObservableSubscribe {
    constructor(data = {}) {
        this._data = data;
    }

    subscribe(fn) {
        return fn(this._data);
    }
}

class SensorWidgetServiceMock {
    subscribe(device, callback) {
        sensorWidgetServiceDevice = device;
        sensorWidgetServiceCallback = callback;
    }
}

class ActivatedRouteMock {
    constructor(devices) {
        this.data = new ObservableSubscribe({devices});
    }
}

describe('Dashboard', () => {
    let sut;
    let sensorWidgetService;
    let activatedRouteMock;
    let sensor;
    let executor;
    let mockDevices;

    beforeEach(() => {
        sensor = {device: {executor: false}};
        executor = {device: {executor: true}, hidden: false};
        mockDevices = {
            devices: [sensor, executor]
        };

        activatedRouteMock = new ActivatedRouteMock(mockDevices);

        sensorWidgetService = new SensorWidgetServiceMock();
        sut = new Dashboard(sensorWidgetService, activatedRouteMock);
    });

    describe('when initialize a component', () => {
        beforeEach(() => {
            spyOn(activatedRouteMock.data, 'subscribe').and.callThrough();
            sut.ngOnInit();
        });

        it('should recive subscribe to activatedRouteMock.data', () => {
            expect(activatedRouteMock.data.subscribe).toHaveBeenCalled();
        });

        it('should get device list', () => {
            expect(sut.widgets).toEqual(mockDevices.devices);
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
