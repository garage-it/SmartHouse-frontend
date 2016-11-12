import { ChartWidgetComponent } from './chart-widget.component';

describe('ChartWidgetComponent', () => {
    let sut;
    let ActivatedRoute;
    let ChartPeriodFormatterService;
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
        ChartPeriodFormatterService = {
            getLabels: jasmine.createSpy('getLabels').and.returnValue(xAxisNames)
        };
        sut = new ChartWidgetComponent(ActivatedRoute, ChartPeriodFormatterService);
    });

    describe('when component is initialized', () => {

        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should subscribe to state params', () => {
            expect(ActivatedRoute.params.subscribe).toHaveBeenCalled();
        });

        it('should update period on scope', () => {
            let params = {period: 'some period'};
            ActivatedRoute.params.subscribe.calls.first().args[0](params);
            expect(sut.period).toEqual(params.period);
        });

        it('should subscribe to state params', () => {
            expect(ActivatedRoute.params.subscribe).toHaveBeenCalled();
        });

    });

    describe('when component is destroyed', () => {
        it('should unsubscribe from state params', () => {
            sut.ngOnInit();
            sut.ngOnDestroy();
            expect(routeSubscription.unsubscribe).toHaveBeenCalled();
        });
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

        it('should set appropriate date format on xAxis depends on choosing period', () => {
            sut.ngOnChanges();
            expect(sut.options.xAxis[0].categories).toBe(xAxisNames);
        });

        it('should get new xAxis names when period is changed', () => {
            let newData = [{}, {}];
            sut.deviceStatistic.data = newData;
            sut.period = 'year';
            sut.ngOnChanges();
            expect(ChartPeriodFormatterService.getLabels).toHaveBeenCalledWith(newData, 'year');
        });

        it('should display data in yAxis depends of type of sensor', () => {
            sut.deviceId = 'temperature';
            sut.ngOnChanges();
            expect(sut.options.yAxis[0].labels.format).toEqual('{value}°C');
        });

        it('should display sensor name on yAxis title', () => {
            sut.deviceStatistic.sensor = 'sensor name';
            sut.ngOnChanges();
            expect(sut.options.yAxis[0].title.text).toEqual(sut.deviceStatistic.sensor);
        });

        it('should set name of chart series data', () => {
            sut.deviceStatistic.sensor = 'sensor name';
            sut.ngOnChanges();
            expect(sut.options.series[0].name).toEqual(sut.deviceStatistic.sensor);
        });

        it('should set data value to chart series', () => {
            sut.deviceStatistic.data = [{value: 12}, {value: 13}];
            sut.ngOnChanges();
            expect(sut.options.series[0].data).toEqual([12, 13]);
        });
    });
});
