import { SwitcherWidgetComponent } from './switcher-widget.component';

describe('Sensor-executor-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new SwitcherWidgetComponent(null);
        sut.pushEvent = jasmine.createSpy('pushEvent');
    });

    describe('Switch executor', () => {
        it('should push command when executor change state', () => {
            const $event = {
                target: {checked: true}
            };
            sut.switchExecutor($event);
            expect(sut.pushEvent).toHaveBeenCalledWith(
                $event.target.checked,
                'ON',
                'OFF'
            );
        });
    });

    describe('when receiving device related data', () => {
        let result;

        it('should enable executor data when receive ON from device', () => {
            result = sut.fromDeviceRepresentation('ON');
            expect(result).toEqual(true);
        });

        it('should not enable executor data when receive not ON from device', () => {
            result = sut.fromDeviceRepresentation('other');
            expect(result).toEqual(false);
        });
    });
});
