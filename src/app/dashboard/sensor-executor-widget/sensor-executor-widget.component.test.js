import {SensorExecutorWidget} from './sensor-executor-widget.component';
import {DEVICE_ON_STATE, DEVICE_OFF_STATE} from '../base-output-sensor';

describe('sensor-executor-widget', () => {
    let sut;
    beforeEach(() => {
        sut = new SensorExecutorWidget();
        sut.data = {};
        sut.device = {
            mqttId: 'mock'
        };
        spyOn(sut, 'pushEvent').and.callThrough();
        spyOn(sut, 'fromDeviceRepresentation').and.callThrough();
    });

    describe('Switch executor', () => {
        it('should push command when executor change state', () => {
            const $eventMock = {
                target: {checked: true}
            };
            sut.switchExecutor($eventMock);
            expect(sut.pushEvent).toHaveBeenCalledWith({
                condition: $eventMock.target.checked,
                positiveValue: DEVICE_ON_STATE,
                negativeValue: DEVICE_OFF_STATE
            });
        });

        it('should convert data to SM format when receive it from device', () => {
            sut.onDeviceDataChanged({value: 'ON'});
            expect(sut.fromDeviceRepresentation).toHaveBeenCalledWith('ON');
        });

        it('should enable executor data when receive ON from device', () => {
            sut.onDeviceDataChanged({value: 'ON'});
            expect(sut.data.value).toEqual(true);
        });

    });

});
