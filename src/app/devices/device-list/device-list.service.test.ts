import {async, TestBed} from '@angular/core/testing';

import { DeviceListService } from './device-list.service';
import { ShHttpService } from '../../core/sh-http/sh-http.service';

const observableMock = { map() {} };

class HttpMock {
    get() { return observableMock; }
}

describe('DeviceListService', () => {
    let sut;
    let httpMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ShHttpService, useClass: HttpMock },
                DeviceListService
            ]
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.get(DeviceListService);
            httpMock = TestBed.get(ShHttpService);
            spyOn(httpMock, 'get').and.callThrough();
        });
    }));

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should retrieve list of sensors from the server', () => {
        sut.getSensors();
        expect(httpMock.get).toHaveBeenCalledWith('/sensors');
    });
});
