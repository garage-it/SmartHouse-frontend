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
    });

    describe('Switch executor', () => {
        const $eventMock = {
            target: {checked: true}
        };
        it('should push command when executor change state', () => {
            sut.switchExecutor($eventMock);
            expect(sut.pushEvent).toHaveBeenCalledWith({
                condition: $eventMock.target.checked,
                positiveValue: DEVICE_ON_STATE,
                negativeValue: DEVICE_OFF_STATE
            });
        });
    });

});
