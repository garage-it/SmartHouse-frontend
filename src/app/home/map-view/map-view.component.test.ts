import { MapViewComponent } from './map-view.component';

describe('Map View', () => {
    let sut;
    let MapViewService;

    beforeEach(() => {
        MapViewService = {
            resolvePictureUrl: jasmine.createSpy('resolvePictureUrl')
        };

        sut = new MapViewComponent(MapViewService);
    });

    describe('get image', () => {

        beforeEach(() => {
            sut.currentMapView = jasmine.createSpy('currentMapView').and.returnValue({});
            sut.getImage();
        });

        it('should get appropriate url where image can be loaded', () => {
            expect(MapViewService.resolvePictureUrl).toHaveBeenCalledWith(sut.currentMapView);
        });
    });

});
