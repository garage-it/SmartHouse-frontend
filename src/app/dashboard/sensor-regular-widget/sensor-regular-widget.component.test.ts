import { SensorRegularWidgetComponent } from './sensor-regular-widget.component';
import { EventEmitter } from '@angular/core';

describe('Sensor-regular-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new SensorRegularWidgetComponent(null);
    });

    it('should have event emitter for remove widget event', () => {
        expect(sut.onRemoveWidget instanceof EventEmitter).toBeTruthy();
    });
});
