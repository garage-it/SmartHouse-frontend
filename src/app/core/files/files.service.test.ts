import { FilesService } from './files.service';

describe('FilesService', () => {

    const mergedRequestOptions = {
        url: 'url'
    };

    let sut;
    let requestOptions;

    beforeEach(() => {

        requestOptions = {
            merge: jasmine.createSpy('merge').and.returnValue(mergedRequestOptions)
        };

        sut = new FilesService(requestOptions);

    });

    describe('resolve file url', () => {
        let result;

        beforeEach(() => {
            result = sut.resolveFileUrl('myFile');
        });

        it('should merge with default request options', () => {
            expect(requestOptions.merge).toHaveBeenCalledWith({ url: 'files/myFile' });
        });

        it('should return default url', () => {
            expect(result).toEqual(mergedRequestOptions.url);
        });

    });

});
