import { StatisticService } from './statistic.service';
import { URLSearchParams } from '@angular/http';

describe('StatisticService', () => {
    let httpMock;
    let sut;

    beforeEach(() => {
        httpMock = jasmine.createSpyObj('mock http', ['get']);
    });

    beforeEach(() => {
        sut = new StatisticService(httpMock);
    });

    describe('#getStatistics', () => {
        const deviceId = 'some device id';
        const period = 'some period';

        beforeEach(() => {
            sut.getStatistic(deviceId, period);
        });

        it('should get statistics of the sensor from the server', () => {
            const params = new URLSearchParams();
            params.set('period', period);
            params.set('sensor', deviceId);
            expect(httpMock.get).toHaveBeenCalledWith('/timeseries', params);
        });
    });
});
