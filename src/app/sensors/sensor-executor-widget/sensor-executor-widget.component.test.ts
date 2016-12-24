import { SensorExecutorWidgetComponent } from './sensor-executor-widget.component';
import { EventEmitter } from '@angular/core';

describe('Sensor-executor-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new SensorExecutorWidgetComponent(null);
        sut.pushEvent = jasmine.createSpy('pushEvent');
    });

    it('should have event emitter for remove widget event', () => {
        expect(sut.onRemoveWidget instanceof EventEmitter).toBeTruthy();
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