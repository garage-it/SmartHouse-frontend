import { BaseSensor } from './base-sensor';
import { EventEmitter } from '@angular/core';

let sensorUpdateHandler;

class SensorWidgetServiceMock {
    subscribe(device, callback) {
        sensorUpdateHandler = callback;
    }
    unsubscribe() {}
}

describe('base-sensor', () => {
    let sut;
    let device;
    let sensorWidgetService;

    beforeEach(() => {
        sensorWidgetService = new SensorWidgetServiceMock();
        spyOn(sensorWidgetService, 'subscribe').and.callThrough();
        spyOn(sensorWidgetService, 'unsubscribe').and.callThrough();

        sut = new BaseSensor(sensorWidgetService);

        device = { mqttId: 'For test' };
        sut.device = device;
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should have event emitter for remove widget event', () => {
        expect(sut.onRemoveWidget instanceof EventEmitter).toBeTruthy();
    });

    describe('when initialize component', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should initialize sensor data', () => {
            expect(sut.data).toEqual({value: null});
        });

        it('should subscribe by proper device', () => {
            expect(sensorWidgetService.subscribe.calls.mostRecent().args[0]).toEqual(device.mqttId);
        });

        it('should update widget data if event addressed to this widget', () => {
            const data = {device: 'For test'};
            sensorUpdateHandler(data);

            expect(sut.data).toEqual(data);
        });

        it('should NOT update widget data if event NOT addressed to this widget', () => {
            const data = {device: 'faked'};
            sensorUpdateHandler(data);

            expect(sut.data).not.toEqual(data);
        });
    });

    describe('when destroy component', () => {
        beforeEach(() => {
            sut.ngOnDestroy();
        });

        it('should unsubscribe by proper device', () => {
            expect(sensorWidgetService.unsubscribe).toHaveBeenCalledWith(device.mqttId);
        });
    });

    describe('when remove widget', () => {
        beforeEach(() => {
            sut.removeWidget();
        });
        
        it('should emit event', () => {
            expect(sut.onRemoveWidget.emit).toHaveBeenCalled();
        });
    });
});
