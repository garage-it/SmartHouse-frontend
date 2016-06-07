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

    describe('isDashboardEmpty', () => {
        it('should return \'true\' if there is no sensors and executors', () => {
            expect(sut.isDashboardEmpty()).toBe(true);
        });

        it('should return \'false\' if there are sensors', () => {
            sut.sensors = [{}];
            expect(sut.isDashboardEmpty()).toBe(false);
        });

        it('should return \'false\' if there are executors', () => {
            sut.sensors = [{ executor: true }];
            expect(sut.isDashboardEmpty()).toBe(false);
        });
    });
});
