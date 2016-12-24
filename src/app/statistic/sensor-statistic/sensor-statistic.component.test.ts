import { SensorStatisticComponent } from './sensor-statistic.component';

describe('SensorStatisticComponent', () => {
    let sut;
    let ActivatedRoute;
    let routeSubscription;

    beforeEach(() => {
        routeSubscription = {
            unsubscribe: jasmine.createSpy('unsubscribe')
        };
        ActivatedRoute = {
            snapshot: {
                params: {
                    id: 123
                }
            },
            data: {
                subscribe: jasmine.createSpy('subscribe').and.returnValue(routeSubscription)
            }
        };
        sut = new SensorStatisticComponent(ActivatedRoute);
    });

    describe('when component is initialized', () => {

        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should set sensorId to scope', () => {
            expect(sut.sensorId).toEqual(123);
        });

        it('should set periods to scope', () => {
            expect(sut.periods).toEqual(['hour', 'day', 'month', 'year']);
        });

        it('should subscribe to state params changes', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set deviceStatistic to scope', () => {
            let subscribedData = {deviceStatistic: {}};
            ActivatedRoute.data.subscribe.calls.first().args[0](subscribedData);
            expect(sut.deviceStatistic).toEqual(subscribedData.deviceStatistic);
        });

    });

    describe('when component is destroyed', () => {
        it('should unsubscribe from state params', () => {
            sut.ngOnInit();
            sut.ngOnDestroy();
            expect(routeSubscription.unsubscribe).toHaveBeenCalled();
        });
    });

    describe('when correct sensor selected', () => {
        const correctMockSensorType = 'switcher';
        it('switcher widget should be visible', () => {
            sut.type = correctMockSensorType;
            expect(sut.isSwitcherWidgetVisible()).toEqual(true);
        });
        it('chat widget should not be visible', () => {
            sut.type = correctMockSensorType;
            expect(sut.isChartWidgetVisible()).toEqual(false);
        });
    });

    describe('when incorrect sensor selected', () => {
        const correctMockSensorType = 'servo';
        it('switcher widget should be visible', () => {
            sut.type = correctMockSensorType;
            expect(sut.isSwitcherWidgetVisible()).toEqual(false);
        });
        it('chat widget should not be visible', () => {
            sut.type = correctMockSensorType;
            expect(sut.isChartWidgetVisible()).toEqual(true);
        });
    });
});
