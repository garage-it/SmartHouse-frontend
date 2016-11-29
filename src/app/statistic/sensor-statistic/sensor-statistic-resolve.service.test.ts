import { SensorStatisticResolveService } from './sensor-statistic-resolve.service';

describe('SensorStatisticResolveService', () => {
    let sut;
    let DashboardService;
    let route = {
        params: {
            id: 123,
            period: 'day'
        }
    };

    beforeEach(() => {
        DashboardService = {
            getStatistic: jasmine.createSpy('getStatistic')
        };
        sut = new SensorStatisticResolveService(DashboardService);
    });

    it('should resolve default statistic for sensor', () => {
        sut.resolve(route);
        expect(DashboardService.getStatistic).toHaveBeenCalledWith(route.params.id, route.params.period);
    });
});
