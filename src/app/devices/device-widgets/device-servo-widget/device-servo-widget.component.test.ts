import { DeviceServoWidgetComponent } from './device-servo-widget.component';

describe('Device-servo-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new DeviceServoWidgetComponent(null);
        sut.pushEvent = jasmine.createSpy('pushEvent');
    });

    describe('Switch executor', () => {
        it('should push command when executor change state', () => {
            sut.data = {
                value: '42'
            };
            sut.changeDegree();
            expect(sut.pushEvent).toHaveBeenCalledWith(true, '42');
        });
    });
});
