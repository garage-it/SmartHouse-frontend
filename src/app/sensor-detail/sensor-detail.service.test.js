import SensorDetailService from './sensor-detail.service';
import {Http} from 'angular2/http';
import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableMock = { map() {} };

class HttpMock {
    get() { return observableMock; }
    put() { return observableMock; }
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
        spyOn(httpMock, 'put').and.callThrough();
        sut = new SensorDetailService(httpMock);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get sensor data from the server', () => {
        const idMock = 'mock';
        sut.get(idMock);
        expect(httpMock.get).toHaveBeenCalledWith(`/sensors/${idMock}`);
    });

    it('should save sensor', () => {
        const sensorMock = {_id: 'mock'};
        sut.save(sensorMock);
        expect(httpMock.put).toHaveBeenCalledWith(`/sensors/${sensorMock._id}`, sensorMock);
    });
});
