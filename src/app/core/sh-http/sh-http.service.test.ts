import { Observable } from 'rxjs/Rx';
import { ShHttpService } from './sh-http.service';

describe('ShHttpService', () => {
    let sut;
    let httpMock;
    const urlMock = Symbol('url to request');
    const mockResponse = Symbol('some response');

    beforeEach(() => {
        httpMock = jasmine.createSpyObj('httpMock', ['get', 'post', 'put', 'delete']);
        sut = new ShHttpService(httpMock);
    });

    describe('http methods', () => {
        beforeEach(() => {
            spyOn(sut, 'getRequestOptions');
            spyOn(sut, 'convertToJson');
            httpMock.put.and.returnValue(Observable.of(mockResponse));
            httpMock.post.and.returnValue(Observable.of(mockResponse));
            httpMock.delete.and.returnValue(Observable.of(mockResponse));
        });

        describe('get method', () => {
            const getRequestOptions = Symbol('get request options');

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.of(mockResponse));
                sut.getRequestOptions.and.returnValue(getRequestOptions);
                sut.get(urlMock).subscribe(() => {});
            });

            it('should get proper request options', () => {
                expect(sut.getRequestOptions).toHaveBeenCalledWith('Get', urlMock);
            });

            it('should get data from server', () => {
                expect(httpMock.get).toHaveBeenCalledWith(urlMock, getRequestOptions);
            });

            it('should get data from server response', () => {
                expect(sut.convertToJson).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });

        describe('post method', () => {
            const postRequestOptions = Symbol('get request options');
            const requestBody = Symbol('data to send');
            const strirgBody = Symbol('stringified body');

            beforeEach(() => {
                spyOn(JSON, 'stringify').and.returnValue(strirgBody);
                httpMock.post.and.returnValue(Observable.of(mockResponse));
                sut.getRequestOptions.and.returnValue(postRequestOptions);
                sut.post(urlMock, requestBody).subscribe(() => {});
            });

            it('should get proper request options', () => {
                expect(sut.getRequestOptions).toHaveBeenCalledWith('Post', urlMock);
            });

            it('should stringify rquest body before send', () => {
                expect(JSON.stringify).toHaveBeenCalledWith(requestBody);
            });

            it('should post data to server', () => {
                expect(httpMock.post).toHaveBeenCalledWith(urlMock, strirgBody, postRequestOptions);
            });

            it('should get data from server response', () => {
                expect(sut.convertToJson).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });

        describe('put method', () => {
            const putRequestOptions = Symbol('get request options');
            const requestBody = Symbol('data to send');
            const strirgBody = Symbol('stringified body');

            beforeEach(() => {
                spyOn(JSON, 'stringify').and.returnValue(strirgBody);
                httpMock.put.and.returnValue(Observable.of(mockResponse));
                sut.getRequestOptions.and.returnValue(putRequestOptions);
                sut.put(urlMock, requestBody).subscribe(() => {});
            });

            it('should get proper request options', () => {
                expect(sut.getRequestOptions).toHaveBeenCalledWith('Put', urlMock);
            });

            it('should stringify rquest body before send', () => {
                expect(JSON.stringify).toHaveBeenCalledWith(requestBody);
            });

            it('should post data to server', () => {
                expect(httpMock.put).toHaveBeenCalledWith(urlMock, strirgBody, putRequestOptions);
            });

            it('should get data from server response', () => {
                expect(sut.convertToJson).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });

        describe('delete method', () => {
            const deleteRequestOptions = Symbol('delete request options');

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.of(mockResponse));
                sut.getRequestOptions.and.returnValue(deleteRequestOptions);
                sut.delete(urlMock).subscribe(() => {});
            });

            it('should get proper request options', () => {
                expect(sut.getRequestOptions).toHaveBeenCalledWith('Delete', urlMock);
            });

            it('should delete item', () => {
                expect(httpMock.delete).toHaveBeenCalledWith(urlMock, deleteRequestOptions);
            });

            it('should get data from server response', () => {
                expect(sut.convertToJson).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });
        });
    });

    describe('request headers', () => {
        let mockToken = Symbol('some mock token');
        let mockAuthHeader = `Bearer ${mockToken}`;

        beforeEach(() => {
            spyOn(sut.headers, 'set');
            spyOn(sut.headers, 'delete');
        });

        it('should be able to set auth headers', () => {
            sut.setAuthHeader(mockToken);

            expect(sut.headers.set).toHaveBeenCalledWith('Authorization', mockAuthHeader);
        });

        it('should be able to remove auth headers', () => {
            sut.removeAuthHeader();

            expect(sut.headers.delete).toHaveBeenCalledWith('Authorization');
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
            expect(sut.convertToJson(mockServerResponse)).toEqual(convertedResponse);
        });
    });

    describe('setting request options', () => {
        let finalOptions;
        const mockUrl = Symbol('url to call');
        const method = 'Get';
        const resultRequestOptions = Symbol('result request options');

        beforeEach(() => {
            spyOn(sut.options, 'merge').and.returnValue(resultRequestOptions);
            finalOptions = sut.getRequestOptions(method, mockUrl);
        });

        it('should assign request options to existing config', () => {
            expect(sut.options.merge)
                .toHaveBeenCalledWith({ method: jasmine.anything(), url: mockUrl });
        });

        it('should construct final request options', () => {
            expect(finalOptions).toEqual(resultRequestOptions);
        });
    });
});
