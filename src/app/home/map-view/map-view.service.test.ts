import { MapViewService } from './map-view.service';

describe('MapViewService', () => {
    const fileUrl = 'fileUrl';
    const response = {};

    let sut;
    let http;
    let result;
    let filesService;

    beforeEach(() => {

        http = {
            get: jasmine.createSpy('get').and.returnValue(response),
            post: jasmine.createSpy('put').and.returnValue(response)
        };

        filesService = {
            resolveFileUrl: jasmine.createSpy('resolveFileUrl').and.returnValue('fileUrl')
        };

        sut = new MapViewService(http, filesService);
    });

    describe('get', () => {

        beforeEach(() => {
            result = sut.get();
        });

        it('should make request for map view', () => {
            expect(http.get).toHaveBeenCalledWith('/map-view');
        });

        it('should return response', () => {
            expect(result).toEqual(response);
        });

    });

    describe('create', () => {

        const mapViewCreateDto = {};

        beforeEach(() => {
            result = sut.create(mapViewCreateDto);
        });

        it('should make request to update map view with updates', () => {
            expect(http.post).toHaveBeenCalledWith('/map-view', mapViewCreateDto);
        });

        it('should return response', () => {
            expect(result).toEqual(response);
        });

    });

    describe('resolve picture url', () => {

        const mapView = { pictureName: 'pictureName' };

        beforeEach(() => {
            result = sut.resolvePictureUrl(mapView);
        });

        it('should resolve file url by picture name', () => {
            expect(filesService.resolveFileUrl).toHaveBeenCalledWith(mapView.pictureName);
        });

        it('should return resolved picture url', () => {
            expect(result).toEqual(fileUrl);
        });

    });

});
