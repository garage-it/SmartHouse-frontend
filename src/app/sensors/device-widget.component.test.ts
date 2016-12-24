import { DeviceWidgetComponent } from './device-widget.component';
import { EventEmitter } from '@angular/core';

describe('Sensor-regular-widget', () => {
    let sut;

    beforeEach(() => {
        sut = new DeviceWidgetComponent();
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should have event emitter for remove widget event', () => {
        expect(sut.onRemoveWidget instanceof EventEmitter).toBeTruthy();
    });

    it('should have disabled edit mode by default', () => {
        expect(sut.isEditMode).toBeFalsy();
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
