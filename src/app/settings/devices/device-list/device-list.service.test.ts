import { DeviceListService } from './device-list.service';

describe('DeviceListService', () => {
    let sut;
    let ShHttpService;

    beforeEach(() => {
        ShHttpService = {
            get: jasmine.createSpy('get')
        };

        sut = new DeviceListService(ShHttpService);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should retrieve list of sensors from the server', () => {
        sut.getSensors();
        expect(ShHttpService.get).toHaveBeenCalledWith('/sensors');
    });
});
