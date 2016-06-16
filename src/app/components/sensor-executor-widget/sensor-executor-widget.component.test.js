import {
    SensorExecutorWidget,
    DEVICE_ON_STATE,
    DEVICE_RESPOND_TIMEOUT
} from './sensor-executor-widget.component';

describe('sensor-executor-widget', () => {
    let sut;
    let sensorWidgetService;

    beforeEach(() => {
        sensorWidgetService = { pushEvent() {} };

        spyOn(sensorWidgetService, 'pushEvent');

        sut = new SensorExecutorWidget();
        sut.data = {};
        sut.sensorWidgetService = sensorWidgetService;
    });

    it('should convert data response to boolean', () => {
        const mockData = {value: DEVICE_ON_STATE};
        sut.onDeviceDataChanged(mockData);
        expect(sut.data.value).toEqual(true);
    });

    describe('Switch', () => {
        const $eventMock = {
            target: {checked: true}
        };
        const mockDeviceMqttId = 'mock';

        beforeEach(() => {
            sut.device = { mqttId: mockDeviceMqttId };
        });

        it('should push command when executor change state', () => {
            sut.switchExecutor($eventMock);
            expect(sensorWidgetService.pushEvent).toHaveBeenCalledWith({
                device: mockDeviceMqttId,
                value: 'ON'
            });
        });

        it('should change state', () => {
            sut.switchExecutor($eventMock);
            expect(sut.data.value).toEqual(true);
        });

        it('should not switch value until delay ends', fakeAsync(() => {
            sut.switchExecutor($eventMock);
            sut.onDeviceDataChanged({value: 'some other value'});
            expect(sut.data.value).toEqual(true);
            tick(DEVICE_RESPOND_TIMEOUT);

            sut.onDeviceDataChanged({value: 'some other value'});
            expect(sut.data.value).not.toEqual(true);
        }));
    });
});
