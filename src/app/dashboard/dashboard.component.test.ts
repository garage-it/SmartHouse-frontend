import { DashboardComponent } from './dashboard.component';
import { Observable } from 'rxjs/Rx';
import { fakeAsync, tick } from '@angular/core/testing';

let sensorWidgetServiceCallback;
let sensorWidgetServiceDevice;

class SensorWidgetServiceMock {
    subscribe(device, callback) {
        sensorWidgetServiceDevice = device;
        sensorWidgetServiceCallback = callback;
    }
}

class ActivatedRouteMock {

    private data: Observable<Object>;

    constructor(devices) {
        this.data = Observable.of({widgets: devices});
    }
}

describe('Dashboard', () => {
    let sut;
    let sensorWidgetService;
    let activatedRouteMock;
    let mockVisibleDevices;

    beforeEach(() => {
        let sensor = {device: {executor: false, servo: false}, hidden: true};
        let executor = {device: {executor: true, servo: false}};
        let servo = {device: {executor: false, servo: true}};

        let mockDevices = {
            devices: [sensor, executor, servo]
        };

        mockVisibleDevices = {
            devices: [executor, servo]
        };

        activatedRouteMock = new ActivatedRouteMock(mockDevices);

        sensorWidgetService = new SensorWidgetServiceMock();
        sut = new DashboardComponent(sensorWidgetService, activatedRouteMock);
    });

    describe('when initialize a component', () => {
        describe('async behaviour', () => {
            beforeEach(() => {
                spyOn(activatedRouteMock.data, 'flatMap').and.callThrough();
            });

            it('should get visible device list', fakeAsync(() => {
                sut.ngOnInit();
                tick();
                expect(sut.widgets).toEqual(mockVisibleDevices.devices);
            }));
        });

        describe('sync behaviour', () => {
            beforeEach(() => {
                sut.ngOnInit();
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
