import { MapViewService } from './map-view.service';

describe('MapViewService', () => {
    const fileUrl = 'fileUrl';
    const response = {};

    let sut;
    let http;
    let result;
    let filesService;
    let requestOptions;

    beforeEach(() => {

        http = {
            get: jasmine.createSpy('get').and.returnValue(response),
            post: jasmine.createSpy('put').and.returnValue(response)
        };

        filesService = {
            resolveFileUrl: jasmine.createSpy('resolveFileUrl').and.returnValue('fileUrl')
        };

        requestOptions = {
            merge: jasmine.createSpy('merge').and.returnValue({url: 'some url'})
        };

        sut = new MapViewService(http, filesService, requestOptions);
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

    describe('resolve picture upload url', () => {

        const mapView = { _id: 'pictureId' };

        beforeEach(() => {
            result = sut.resolvePictureUploadUrl(mapView);
        });

        it('should resolve file url by picture name', () => {
            expect(requestOptions.merge).toHaveBeenCalledWith({ url: `/map-view/${mapView._id}/picture` });
        });

        it('should return resolved picture url', () => {
            expect(result).toEqual('some url');
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
