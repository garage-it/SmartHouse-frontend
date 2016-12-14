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
        let defaultMapView;
        let viewListFirst;
        let viewListSecond;

        beforeEach(() => {
            defaultMapView = {name: 'some name', default: true};
            viewListFirst = {mapView: {name: 'some name 2'}};
            viewListSecond = {mapView: defaultMapView};
            subscribedData = {viewList: [viewListFirst, viewListSecond]};
            sut.ngOnInit();
            ActivatedRoute.data.subscribe.calls.first().args[0](subscribedData);
        });

        it('should subscribe to resolved data from current route', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set resolved list of views to scope', () => {
            expect(sut.listViews).toEqual([viewListFirst, viewListSecond]);
        });

        it('should set resolved list of map views to scope', () => {
            expect(sut.listMapViews).toEqual([viewListFirst.mapView, viewListSecond.mapView]);
        });

        it('should set default map view', () => {
            expect(sut.currentMapView).toEqual(defaultMapView);
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
