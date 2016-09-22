import { BaseSensor } from './base-sensor';

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

        sut = new BaseSensor();
        sut.sensorWidgetService = sensorWidgetService;

        device = { mqttId: 'For test' };
        sut.device = device;
    });

    describe('when initialize component', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should initialize sensor data', () => {
            expect(sut.data).toEqual({});
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
});
