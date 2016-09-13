import SensorDetailService from '../details/sensor-detail.service';
import { SensorDetailListResolveService } from './sensor-detail-list-resolve.service';

import { beforeEachProviders } from '@angular/core/testing';
import { provide } from '@angular/core';

const observableMock = {};

class SensorDetailServiceMock {
    get() { return observableMock; }
}

describe('sensor-detail-list-resolve service', () => {
    let sut;
    let sensorsService;

    beforeEachProviders(() => [
        provide(SensorDetailService, {useClass: SensorDetailServiceMock})
    ]);


    beforeEach(() => {
        sensorsService = new SensorDetailServiceMock();
        sut = new SensorDetailListResolveService(sensorsService);

        spyOn(sensorsService, 'get').and.callThrough();
    });


    it('should call sensorsService get method', () => {
        sut.resolve();
        expect(sut.sensorsService.get).toHaveBeenCalled();
    });
});
