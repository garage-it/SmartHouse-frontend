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
        const sensor = {device: {executor: false, servo: false}, hidden: true};
        const executor = {device: {executor: true, servo: false}};
        const servo = {device: {executor: false, servo: true}};

        const mockDevices = {
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
                sensorWidgetServiceCallback({event: 'device-add', data: 'faked', value: 'mockValue'});
                expect(sut.widgets).toContain({
                    device: 'faked',
                    hidden: false,
                    value: 'mockValue'
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
