import ShHttp from './sh-http.service.js';
import ShRequestOptions from './sh-request-options';

import {Http, RequestMethod, Headers} from 'angular2/http';
import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableMock = { map() {} };

class HttpMock {
    get() { return observableMock; }
    put() { return observableMock; }
}

describe('ShHttpService', () => {
    let sut;
    let httpMock;

    beforeEachProviders(() => [
        provide(Http, {useClass: HttpMock})
    ]);

    beforeEach(() => {
        httpMock = new HttpMock();
        spyOn(httpMock, 'get').and.callThrough();
        spyOn(httpMock, 'put').and.callThrough();
        sut = new ShHttp(httpMock);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get sensor data from the server', () => {
        const urlMock = 'mock';
        let options = new ShRequestOptions();
        options = options.merge({
            method: RequestMethod.Get,
            url: urlMock
        });
        sut.get(urlMock);
        expect(httpMock.get).toHaveBeenCalledWith(urlMock, options);
    });

    it('should update sensor', () => {
        const urlMock = 'mock';
        const bodyMock = {};
        let options = new ShRequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        options = options.merge({
            method: RequestMethod.Put,
            url: urlMock
        });
        sut.put(urlMock, bodyMock);
        expect(httpMock.put).toHaveBeenCalledWith(urlMock, JSON.stringify(bodyMock), options);
    });
});
