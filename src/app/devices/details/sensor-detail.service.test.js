import SensorDetailService from './sensor-detail.service';
import {Http} from '@angular/http';
import {beforeEachProviders} from '@angular/core/testing';
import {provide} from '@angular/core';

const observableMock = { map() {} };

class HttpMock {
    get() { return observableMock; }
    post() { return observableMock; }
    put() { return observableMock; }
    delete() { return observableMock; }
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
        spyOn(httpMock, 'put').and.callThrough();
        spyOn(httpMock, 'delete').and.callThrough();
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
        expect(httpMock.post).toHaveBeenCalledWith('/sensors', sensorMock);
    });

    it('should update sensor', () => {
        const sensorMock = {_id: 'mock'};
        sut.update(sensorMock);
        expect(httpMock.put).toHaveBeenCalledWith(`/sensors/${sensorMock._id}`, sensorMock);
    });

    it('should delete sensor', () => {
        const sensorMock = {_id: 'mock'};
        sut.delete(sensorMock);
        expect(httpMock.delete).toHaveBeenCalledWith(`/sensors/${sensorMock._id}`, sensorMock);
    });
});
