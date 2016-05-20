import {Dashboard} from './dashboard';

let subscribeHandler;

class DeviceListServiceMock {
    getSensors() {
        return {
            subscribe: (callback) => {
                subscribeHandler = callback;
            }
        };
    }
}

describe('Dashboard', () => {
    let sut;
    let deviceListService;

    beforeEach(() => {
        deviceListService = new DeviceListServiceMock();
        sut = new Dashboard(deviceListService);
    });

    describe('when initialize a component', () => {
        let deviceList;

        beforeEach(() => {
            deviceList = [];
            sut.ngOnInit();
        });

        it('should get device list', () => {
            subscribeHandler(deviceList);
            expect(sut.deviceList).toEqual(deviceList);
        });
    });
});
