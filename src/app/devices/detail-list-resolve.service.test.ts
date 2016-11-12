import { DeviceListResolveService } from './detail-list-resolve.service';

describe('sensor-detail-list-resolveService', () => {
    let sut;
    let SensorDetailService;

    beforeEach(() => {
        SensorDetailService = {
            get: jasmine.createSpy('get')
        };

        sut = new DeviceListResolveService(SensorDetailService)
    });

    it('should call sensorsService get method', () => {
        sut.resolve();
        expect(SensorDetailService.get).toHaveBeenCalled();
    });
});
