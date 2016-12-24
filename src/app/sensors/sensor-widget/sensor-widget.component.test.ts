import { SensorWidgetComponent } from './sensor-widget.component';
import { EventEmitter } from '@angular/core';

describe('Sensor-regular-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new SensorWidgetComponent();
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should have event emitter for remove widget event', () => {
        expect(sut.onRemoveWidget instanceof EventEmitter).toBeTruthy();
    });

    describe('when remove widget', () => {
        beforeEach(() => {
            sut.removeWidget();
        });

        it('should emit event', () => {
            expect(sut.onRemoveWidget.emit).toHaveBeenCalled();
        });
    });
});
