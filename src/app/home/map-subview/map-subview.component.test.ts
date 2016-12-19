import { MapSubviewComponent } from './map-subview.component';

describe('Map Subview', () => {
    let sut;
    let MapSubviewService;
    const resolvedUrl = {};

    beforeEach(() => {
        MapSubviewService = {
            resolvePictureUrl: jasmine.createSpy('resolvePictureUrl').and.returnValue(resolvedUrl)
        };

        sut = new MapSubviewComponent(MapSubviewService);
    });

    describe('get image', () => {

        let result;

        beforeEach(() => {
            sut.mapSubview = jasmine.createSpy('mapSubview').and.returnValue({});
            result = sut.getImage();
        });

        it('should resolve image url which should be loaded', () => {
            expect(MapSubviewService.resolvePictureUrl).toHaveBeenCalledWith(sut.mapSubview);
        });

        it('should get appropriate url where image can be loaded', () => {
            expect(result).toEqual(resolvedUrl);
        });
    });

});
