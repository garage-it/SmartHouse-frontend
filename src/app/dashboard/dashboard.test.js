import {Dashboard} from './dashboard';

let subscribeHandler;

class DashboardServiceMock {
    getWidgets() {
        return {
            subscribe: (callback) => {
                subscribeHandler = callback;
            }
        };
    }
}

describe('Dashboard', () => {
    let sut;
    let dashboardService;

    beforeEach(() => {
        dashboardService = new DashboardServiceMock();
        sut = new Dashboard(dashboardService);
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
            subscribeHandler({devices: deviceList});
            expect(sut.devices).toEqual(deviceList);
        });
    });

    describe('isDashboardEmpty', () => {
        it('should show empty dashboard if there is no sensors and executors', () => {
            expect(sut.isDashboardEmpty()).toBe(true);
        });

        it('should NOT show empty dashboard if there is at least one device', () => {
            sut.devices = [{}];
            expect(sut.isDashboardEmpty()).toBe(false);
        });
    });
});
