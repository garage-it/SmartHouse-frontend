import { ChartPeriodFormatterService } from './chart-period-formatter.service';

describe('ChartPeriodFormatterService', () => {
    let sut;
    let mockDates;

    beforeEach(() => {
        mockDates = [
            {
                date: '2016-09-08T01:00:00.001Z'
            },
            {
                date: '2016-10-09T02:00:00.001Z'
            },
            {
                date: '2016-11-10T03:00:00.001Z'
            }
        ];
        sut = new ChartPeriodFormatterService;
    });

    it('should filter input data for day chart', () => {
        let result = sut.getLabels(mockDates, 'day');
        expect(result).toEqual([18, 19, 19]);
    });

    it('should filter input data for week chart', () => {
        let result = sut.getLabels(mockDates, 'week');
        expect(result).toEqual(['Thu', 'Sun', 'Thu']);
    });

    it('should filter input data for month chart', () => {
        let result = sut.getLabels(mockDates, 'month');
        expect(result).toEqual([7, 8, 9]);
    });

    it('should filter input data for year chart', () => {
        let result = sut.getLabels(mockDates, 'year');
        expect(result).toEqual(['Sep', 'Oct', 'Now']);
    });

});
