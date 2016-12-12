import { EventEmitter } from '@angular/core';
import { MapViewListComponent } from './map-view-list.component';

describe('Map View List', () => {
    let sut;

    beforeEach(() => {
        sut = new MapViewListComponent();
    });

    describe('view map', () => {
        const mapView = {};

        beforeEach(() => {
            sut.onSelectMapView.emit = jasmine.createSpy('emit');
            sut.viewMap(mapView);
        });

        it('should have event emitter for select map view event', () => {
            expect(sut.onSelectMapView instanceof EventEmitter).toBeTruthy();
        });

        it('should emit event that current map view was changed', () => {
            expect(sut.onSelectMapView.emit).toHaveBeenCalledWith(mapView);
        });
    });

});
