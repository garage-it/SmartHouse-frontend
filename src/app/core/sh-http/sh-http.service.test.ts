import { Observable } from 'rxjs/Rx';
import { ShHttpService } from './sh-http.service';

describe('ShHttpService', () => {
    let sut;
    let httpMock;
    let defaultRequestOptions;
    const urlMock = Symbol('url to request');
    const mockResponse = Symbol('some response');
    const mergedOptions = Symbol('merged options');

    beforeEach(() => {
        httpMock = jasmine.createSpyObj('httpMock', ['get', 'post', 'put', 'delete']);
        defaultRequestOptions = {
            headers: {
                set: jasmine.createSpy('setHeader'),
                delete: jasmine.createSpy('deleteHeader'),
            },
            merge: jasmine.createSpy('merge').and.returnValue(mergedOptions)
        };
        sut = new ShHttpService(httpMock, defaultRequestOptions);
    });

    describe('http methods', () => {
        beforeEach(() => {
            spyOn(ShHttpService, 'onResponseSuccess');
            httpMock.put.and.returnValue(Observable.of(mockResponse));
            httpMock.post.and.returnValue(Observable.of(mockResponse));
            httpMock.delete.and.returnValue(Observable.of(mockResponse));
        });

        describe('get method', () => {
            const search = {};

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.of(mockResponse));
                sut.get(urlMock, search).subscribe(() => {});
            });

            it('should override url and search params', () => {
                expect(defaultRequestOptions.merge).toHaveBeenCalledWith({
                    url: urlMock,
                    search
                });
            });

            it('should get data from server', () => {
                expect(httpMock.get).toHaveBeenCalledWith(urlMock, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(ShHttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });

        describe('post method', () => {
            const requestBody = Symbol('data to send');

            beforeEach(() => {
                httpMock.post.and.returnValue(Observable.of(mockResponse));
                sut.post(urlMock, requestBody).subscribe(() => {});
            });

            it('should override url', () => {
                expect(defaultRequestOptions.merge).toHaveBeenCalledWith({
                    url: urlMock
                });
            });

            it('should post data to server', () => {
                expect(httpMock.post).toHaveBeenCalledWith(urlMock, requestBody, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(ShHttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });

        describe('put method', () => {
            const requestBody = Symbol('data to send');

            beforeEach(() => {
                httpMock.put.and.returnValue(Observable.of(mockResponse));
                sut.put(urlMock, requestBody).subscribe(() => {});
            });

            it('should override url', () => {
                expect(defaultRequestOptions.merge).toHaveBeenCalledWith({
                    url: urlMock
                });
            });

            it('should post data to server', () => {
                expect(httpMock.put).toHaveBeenCalledWith(urlMock, requestBody, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(ShHttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });

        describe('delete method', () => {

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.of(mockResponse));
                sut.delete(urlMock).subscribe(() => {});
            });

            it('should override url', () => {
                expect(defaultRequestOptions.merge).toHaveBeenCalledWith({
                    url: urlMock
                });
            });

            it('should delete item', () => {
                expect(httpMock.delete).toHaveBeenCalledWith(urlMock, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(ShHttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });
    });

    describe('request headers', () => {
        const mockToken = Symbol('some mock token');
        const mockAuthHeader = `Bearer ${mockToken}`;

        it('should be able to set auth headers', () => {
            sut.setAuthHeader(mockToken);

            expect(defaultRequestOptions.headers.set).toHaveBeenCalledWith('Authorization', mockAuthHeader);
        });

        it('should be able to remove auth headers', () => {
            sut.removeAuthHeader();

            expect(defaultRequestOptions.headers.delete).toHaveBeenCalledWith('Authorization');
        });
    });

    describe('response transformer', () => {
        let mockServerResponse;
        const convertedResponse = Symbol('converted server response');

        beforeEach(() => {
            mockServerResponse = {
                json: jasmine.createSpy('json').and.returnValue(convertedResponse)
            };
        });

        it('should extract data from response', () => {
            expect(ShHttpService.onResponseSuccess(mockServerResponse)).toEqual(convertedResponse);
        });
    });
});
