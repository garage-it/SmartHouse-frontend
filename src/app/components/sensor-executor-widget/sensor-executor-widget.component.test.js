import {
    SensorExecutorWidget,
    DEVICE_ON_STATE
} from './sensor-executor-widget.component';

describe('sensor-executor-widget', () => {
    let sut;
    let sensorWidgetService;

    beforeEach(() => {
        sensorWidgetService = { pushCommand() {} };

        spyOn(sensorWidgetService, 'pushCommand');

        sut = new SensorExecutorWidget();
        sut.data = {};
        sut.sensorWidgetService = sensorWidgetService;
    });

    it('should convert data response to boolean', () => {
        const mockData = { value: DEVICE_ON_STATE };
        sut.onDeviceDataChanged(mockData);
        expect(sut.data.value).toEqual(true);
    });

    it('should push command when executor change state', () => {
        const checkedMock = 'mock';
        const $eventMock = {
            target: { checked: checkedMock }
        };
        const mockDeviceMqttId = 'mock';
        sut.device = { mqttId: mockDeviceMqttId };
        sut.switchExecutor($eventMock);
        expect(sensorWidgetService.pushCommand).toHaveBeenCalledWith({
            device: mockDeviceMqttId,
            command: 'ON'
        });
    });
});
