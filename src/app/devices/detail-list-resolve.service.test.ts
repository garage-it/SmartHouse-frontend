import { async, TestBed } from '@angular/core/testing';

import { SensorDetailService } from './shared/sensor-detail.service';
import { DeviceListResolveService } from './detail-list-resolve.service';

const observableMock = {};

class SensorDetailServiceMock {
    get() { return observableMock; }
}

describe('sensor-detail-list-resolveService', () => {
    let sut;
    let sensorsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: SensorDetailService, useClass: SensorDetailServiceMock },
                DeviceListResolveService
            ]
        })
        .compileComponents()
        .then(() => {
            sensorsService = TestBed.get(SensorDetailService);
            sut = TestBed.get(DeviceListResolveService);
            spyOn(sensorsService, 'get').and.callThrough();
        });
    }));

    it('should call sensorsService get method', () => {
        sut.resolve();
        expect(sut.sensorsService.get).toHaveBeenCalled();
    });
});
