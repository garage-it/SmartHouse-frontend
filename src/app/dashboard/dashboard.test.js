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
            sensor = {device: {executor: false}};
            executor = { device: {executor: true}, hidden: false };
            deviceList = [sensor, executor];
            sut.ngOnInit();
        });

        it('should get device list', () => {
            subscribeHandler({devices: deviceList});
            expect(sut.widgets).toEqual(deviceList);
        });
    });

    describe('isDashboardEmpty', () => {
        it('should show empty dashboard if there is no sensors and executors', () => {
            expect(sut.isDashboardEmpty()).toBe(true);
        });

        it('should hide empty state of dashboard if there is at least one device', () => {
            sut.widgets = [{}];
            expect(sut.isDashboardEmpty()).toBe(false);
        });
    });
});
