import { MapViewComponent } from './map-view.component';

describe('Map View', () => {
    let sut;
    let PictureResolverService;
    const resolvedUrl = {};

    beforeEach(() => {
        PictureResolverService = {
            resolvePictureUrl: jasmine.createSpy('resolvePictureUrl').and.returnValue(resolvedUrl)
        };

        sut = new MapViewComponent(PictureResolverService);
    });

    describe('get image', () => {

        let result;

        beforeEach(() => {
            sut.currentMapView = jasmine.createSpy('currentMapView').and.returnValue({});
            result = sut.getImage();
        });

        it('should resolve image url which should be loaded', () => {
            expect(PictureResolverService.resolvePictureUrl).toHaveBeenCalledWith(sut.currentMapView);
        });

        it('should get appropriate url where image can be loaded', () => {
            expect(result).toEqual(resolvedUrl);
        });
    });

});
