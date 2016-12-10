import { DeviceListResolver } from './devices.resolver';

describe('sensor-detail-list-resolveService', () => {
    let sut;
    let DevicesService;

    beforeEach(() => {
        DevicesService = {
            get: jasmine.createSpy('get')
        };

        sut = new DeviceListResolver(DevicesService);
    });

    it('should call sensorsService get method', () => {
        sut.resolve();
        expect(DevicesService.get).toHaveBeenCalled();
    });
});
