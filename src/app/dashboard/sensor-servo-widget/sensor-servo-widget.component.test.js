import {SensorServoWidget} from './sensor-servo-widget.component';

describe('sensor-servo-widget', () => {
    let sut;
    beforeEach(() => {
        sut = new SensorServoWidget();
        sut.data = {};
        sut.device = {
            mqttId: 'mock'
        };
        spyOn(sut, 'pushEvent').and.callThrough();
    });

    describe('Switch executor', () => {
        it('should push command when executor change state', () => {
            sut.data.value = '42';
            sut.changeDegree();
            expect(sut.pushEvent).toHaveBeenCalledWith({
                condition: true,
                positiveValue: '42',
            });
        });
    });

});
