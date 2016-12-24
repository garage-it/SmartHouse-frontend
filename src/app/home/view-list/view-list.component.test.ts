import { EventEmitter } from '@angular/core';
import { ViewListComponent } from './view-list.component';

describe('Map View List', () => {
    let sut;

    beforeEach(() => {
        sut = new ViewListComponent();
    });

    describe('view map', () => {
        const mapView = {};

        beforeEach(() => {
            sut.onSelectView.emit = jasmine.createSpy('emit');
            sut.viewMap(mapView);
        });

        it('should have event emitter for select map view event', () => {
            expect(sut.onSelectView instanceof EventEmitter).toBeTruthy();
        });

        it('should emit event that current map view was changed', () => {
            expect(sut.onSelectView.emit).toHaveBeenCalledWith(mapView);
        });
    });

});
