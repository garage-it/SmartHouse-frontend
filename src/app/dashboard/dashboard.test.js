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
        let sensor;
        let executor;
        let deviceList;

        beforeEach(() => {
            sensor = {};
            executor = { executor: true };
            deviceList = [sensor, executor];
            sut.ngOnInit();
        });

        it('should get device list', () => {
            subscribeHandler(deviceList);
            expect(sut.sensors).toEqual([sensor]);
            expect(sut.executors).toEqual([executor]);
        });
    });
});
