import { BaseChartComponent } from './base-chart.component';
class Sut extends BaseChartComponent {};

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
        sut = new Sut(ActivatedRoute);
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
});
