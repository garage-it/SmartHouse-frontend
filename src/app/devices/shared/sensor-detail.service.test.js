import {async, TestBed} from '@angular/core/testing';

import { SensorDetailService } from './sensor-detail.service';
import { ShHttpService } from '../../shared/sh-http/sh-http.service.js';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ShHttpService, useClass: HttpMock },
                SensorDetailService
            ]
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.get(SensorDetailService);
            httpMock = TestBed.get(ShHttpService);
            spyOn(httpMock, 'get').and.callThrough();
            spyOn(httpMock, 'post').and.callThrough();
            spyOn(httpMock, 'put').and.callThrough();
            spyOn(httpMock, 'delete').and.callThrough();
        });
    }));

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
