import { SensorSwitcherWidgetComponent } from './sensor-switcher-widget.component';

describe('Sensor-servo-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new SensorSwitcherWidgetComponent(null);
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
