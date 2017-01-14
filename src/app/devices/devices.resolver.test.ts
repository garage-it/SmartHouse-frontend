import { DeviceListResolver } from './devices.resolver';

describe('Devices Resolver', () => {
    let sut;
    let DevicesService;

    beforeEach(() => {
        DevicesService = {
            getSensors: jasmine.createSpy('get')
        };

        sut = new DeviceListResolver(DevicesService);
    });

    it('should call sensorsService get method', () => {
        sut.resolve();
        expect(DevicesService.getSensors).toHaveBeenCalled();
    });
});
