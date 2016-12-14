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
        let viewListFirst;
        let viewListSecond;
        let viewListThird;

        beforeEach(() => {
            viewListFirst = {mapView: {name: 'some name'}};
            viewListSecond = {mapView: {name: 'some name'}};
            viewListThird = {dashboard: {devices: []}};
            subscribedData = {viewList: [viewListFirst, viewListSecond, viewListThird]};
            sut.ngOnInit();
            ActivatedRoute.data.subscribe.calls.first().args[0](subscribedData);
        });

        it('should subscribe to resolved data from current route', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set resolved list of map views to scope', () => {
            expect(sut.listMapViews).toEqual([viewListFirst.mapView, viewListSecond.mapView]);
        });

        it('should set resolved list of dasboard views to scope', () => {
            expect(sut.listDashboardViews).toEqual([viewListThird.dashboard]);
        });

        it('should set default map view', () => {
            expect(sut.currentView).toEqual(viewListFirst.mapView);
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
            sut.setCurrentView(newMapView);
            expect(sut.currentView).toEqual(newMapView);
        });
    });

    describe('on view type check', () => {
        it('should be truthy if current view is map view', () => {
            sut.currentView = {};
            sut.listMapViews = [sut.currentView];

            expect(sut.isMapView()).toBeTruthy();
        });

        it('should set new view type to scope', () => {
            sut.currentView = {};
            sut.listDashboardViews = [sut.currentView];

            expect(sut.isMapView()).toBeFalsy();
        });
    });
});
