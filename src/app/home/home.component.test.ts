import { HomeComponent } from './home.component';

describe('Home', () => {
    let sut;
    let ActivatedRoute;
    let undubscribeObj;

    beforeEach(() => {
        undubscribeObj = {
            unsubscribe: jasmine.createSpy('unsubscribe')
        };
        ActivatedRoute = {
            data: {
                subscribe: jasmine.createSpy('subscribe').and.returnValue(undubscribeObj)
            }
        };
        sut = new HomeComponent(ActivatedRoute);
    });

    describe('on init', () => {

        let subscribedData;

        beforeEach(() => {
            subscribedData = {mapList: [{}, {}]};
            sut.ngOnInit();
            ActivatedRoute.data.subscribe.calls.first().args[0](subscribedData);
        });

        it('should subscribe to resolved data from current route', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set resolved list of map views to scope', () => {
            expect(sut.listMapViews).toEqual(subscribedData.mapList);
        });

        it('should set default map view', () => {
            expect(sut.currentMapView).toEqual(subscribedData.mapList[0]);
        });
    });

    describe('on destroy', () => {

        beforeEach(() => {
            sut.ngOnInit();
            sut.ngOnDestroy();
        });

        it('should unsubscribe of resolved data of current route', () => {
            expect(undubscribeObj.unsubscribe).toHaveBeenCalled();
        });
    });

    describe('on current map view change', () => {
        it('should set changed map view to scope', () => {
            const newMapView = {};
            sut.setCurrentMapView(newMapView);
            expect(sut.currentMapView).toEqual(newMapView);
        });
    });
});
