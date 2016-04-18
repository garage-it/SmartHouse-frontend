import {SensorWidget} from './sensor-widget.component';

let sensorUpdateHandler;

class SensorWidgetServiceMock {
    subscribe(device, callback) {
        sensorUpdateHandler = callback;
    }
    unsubscribe() {}
}

describe('sensor-widget', () => {
    let sut;
    let device;
    let sensorWidgetService;

    beforeEach(() => {
        sensorWidgetService = new SensorWidgetServiceMock();
        spyOn(sensorWidgetService, 'subscribe').and.callThrough();
        spyOn(sensorWidgetService, 'unsubscribe').and.callThrough();

        sut = new SensorWidget(sensorWidgetService);

        device = 'For test';
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
            expect(sensorWidgetService.subscribe.calls.mostRecent().args[0]).toEqual(device);
        });

        it('should update widget data by event', () => {
            const data = {a: 1};
            sensorUpdateHandler(data);

            expect(sut.data).toEqual(data);
        });
    });

    describe('when destroy component', () => {
        beforeEach(() => {
            sut.ngOnDestroy();
        });

        it('should unsubscribe by proper device', () => {
            expect(sensorWidgetService.unsubscribe).toHaveBeenCalledWith(device);
        });
    });
});
