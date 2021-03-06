import { ChartWidgetComponent } from './chart-widget.component';

describe('ChartWidgetComponent', () => {
    let sut;
    let ActivatedRoute;
    let routeSubscription;
    let xAxisNames;

    beforeEach(() => {
        xAxisNames = [];
        routeSubscription = {
            unsubscribe: jasmine.createSpy('unsubscribe')
        };
        ActivatedRoute = {
            snapshot: {
                params: {
                    id: 123,
                    period: 'asdf'
                }
            },
            params: {
                subscribe: jasmine.createSpy('subscribe').and.returnValue(routeSubscription)
            }
        };
        sut = new ChartWidgetComponent(ActivatedRoute);
    });

    describe('when component is changed', () => {
        beforeEach(() => {
            sut.deviceStatistic = {
                data: []
            };
        });

        it('should chart be spline', () => {
            sut.ngOnChanges();
            expect(sut.options.chart.type).toBe('spline');
        });

        it('should add sensor name to chart title', () => {
            sut.deviceStatistic.sensor = 'some name';
            sut.ngOnChanges();
            expect(sut.options.title.text).toBe('Statistic for ' + sut.deviceStatistic.sensor + '  sensor');
        });

        it('should set appropriate type of X axis', () => {
            sut.ngOnChanges();
            expect(sut.options.xAxis.type).toEqual('datetime');
        });

        it('should rotate X-axis labels on 45 degrees', () => {
            sut.ngOnChanges();
            expect(sut.options.xAxis.labels.rotation).toEqual(-45);
        });

        it('should format date due to chosen period of time', () => {
            sut.period = 'month';
            sut.ngOnChanges();
            expect(sut.options.xAxis.labels.format).toEqual('{value:%d}');
        });

        it('should show title due to chosen period of time', () => {
            sut.period = 'month';
            sut.ngOnChanges();
            expect(sut.options.xAxis.title.text).toEqual('dates');
        });

        it('should display data in yAxis depends of type of sensor', () => {
            sut.deviceId = 'temperature';
            sut.deviceStatistic.measurementUnit = 'KILOGRAM';
            sut.ngOnChanges();
            expect(sut.options.yAxis[0].labels.format).toEqual(`{value} ${sut.deviceStatistic.measurementUnit}`);
        });

        it('should display sensor name on yAxis title', () => {
            sut.deviceStatistic.sensor = 'sensor name';
            sut.ngOnChanges();
            expect(sut.options.yAxis[0].title.text).toEqual(sut.deviceStatistic.sensor);
        });

        it('should set name of chart series data', () => {
            sut.period = 'period';
            sut.ngOnChanges();
            expect(sut.options.series[0].name).toEqual('Statistics for the ' + sut.period);
        });

        it('should set data value to chart series', () => {
            sut.deviceStatistic.data = [{value: 12}, {value: 13}];
            sut.ngOnChanges();
            expect(sut.options.series[0].data).toEqual([12, 13]);
        });
    });
});
