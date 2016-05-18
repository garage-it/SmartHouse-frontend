import {DeviceListService} from './device-list.service';
import {Http} from 'angular2/http';
import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableMock = { map() {} };

class HttpMock {
    get() { return observableMock; }
}

describe('DeviceListService', () => {
    let sut;
    let httpMock;

    beforeEachProviders(() => [
        provide(Http, {useClass: HttpMock})
    ]);

    beforeEach(() => {
        httpMock = new HttpMock();
        spyOn(httpMock, 'get').and.callThrough();
        sut = new DeviceListService(httpMock);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should retrieve list of sensors from the server', () => {
        sut.getSensors();
        expect(httpMock.getSensors).toHaveBeenCalledWith('/sensors');
    });
});
