import SensorDetailService from './sensor-detail.service';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableMock = { map() {} };

class HttpMock {
    get() { return observableMock; }
    post() { return observableMock; }
}

describe('SensorDetailService', () => {
    let sut;
    let httpMock;

    beforeEachProviders(() => [
        provide(Http, {useClass: HttpMock})
    ]);

    beforeEach(() => {
        httpMock = new HttpMock();
        spyOn(httpMock, 'get').and.callThrough();
        spyOn(httpMock, 'post').and.callThrough();
        sut = new SensorDetailService(httpMock);
        sut.baseUrl = 'api/sensor';
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get sensor data from the server', () => {
        let idMock = 'mock';
        sut.get(idMock);
        expect(httpMock.get).toHaveBeenCalledWith(`${sut.baseUrl}/get/${idMock}`);
    });

    it('should save sensor', () => {
        let sensorMock = {};
        let body = JSON.stringify(sensorMock);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });
        sut.save(sensorMock);
        expect(httpMock.post).toHaveBeenCalledWith(`${sut.baseUrl}/save`, body, options)
    })
});
