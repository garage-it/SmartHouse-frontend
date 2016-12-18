import { PIE_CHART_ENDPOINT, SwitcherStatisticsService } from './switcher-statistic.service';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';

describe('SwitcherStatisticsService', () => {
    let sut;
    let httpMock;

    beforeEach(() => {
        httpMock = jasmine.createSpyObj('httpMock', ['get']);
        sut = new SwitcherStatisticsService(httpMock);
    });

    describe('#getPieChartData', () => {
        let result;
        const pieChartData = {};
        const startDate = 'START_DATE';
        const endDate = 'END_DATE';
        const sensor = 'SENSOR';
        let params;

        beforeEach(() => {
            params = new URLSearchParams();
            params.set('startDate', startDate);
            params.set('endDate', endDate);
            params.set('sensor', sensor);
            httpMock.get.and.returnValue(Observable.of(pieChartData));
            result = sut.getPieChartData(sensor, {startDate, endDate});
        });

        it('should get pie chart from correct endpoint', () => {
            expect(httpMock.get).toHaveBeenCalledWith(PIE_CHART_ENDPOINT, params);
        });

        it('should return the result of endpoint', () => {
            result.subscribe((data) => {
                expect(data).toBe(pieChartData);
            });
        });
    });
});
