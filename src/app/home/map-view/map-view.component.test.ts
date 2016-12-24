import { MapViewComponent } from './map-view.component';

describe('Map View', () => {
    let sut;
    let MapViewService;
    const resolvedUrl = {};

    beforeEach(() => {
        MapViewService = {
            resolvePictureUrl: jasmine.createSpy('resolvePictureUrl').and.returnValue(resolvedUrl)
        };

        sut = new MapViewComponent(MapViewService);
    });

    describe('get image', () => {

        let result;

        beforeEach(() => {
            sut.currentMapView = jasmine.createSpy('currentMapView').and.returnValue({});
            result = sut.getImage();
        });

        it('should resolve image url which should be loaded', () => {
            expect(MapViewService.resolvePictureUrl).toHaveBeenCalledWith(sut.currentMapView);
        });

        it('should get appropriate url where image can be loaded', () => {
            expect(result).toEqual(resolvedUrl);
        });
    });

});
