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
            viewListFirst = {};
            viewListSecond = {};
            viewListThird = {};
            subscribedData = {viewList: [viewListFirst, viewListSecond, viewListThird]};
            sut.setCurrentView = jasmine.createSpy('setCurrentView');
            sut.ngOnInit();
            ActivatedRoute.data.subscribe.calls.first().args[0](subscribedData);
        });

        it('should subscribe to resolved data from current route', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set resolved list of views to scope', () => {
            expect(sut.viewList).toEqual(subscribedData.viewList);
        });

        it('should set default map view', () => {
            expect(sut.setCurrentView).toHaveBeenCalledWith(viewListFirst);
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

    describe('set current view', () => {

        const currentView = {
            _id: 'some id',
            name: 'some name',
            description: 'some desc',
            defaultSubview: 'mapSubview'
        };

        beforeEach(() => {
            sut.setCurrentSubview = jasmine.createSpy('setCurrentSubview');
            sut.setCurrentView(currentView);
        });

        it('should set current view to scope', () => {
            expect(sut.currentView).toEqual(currentView);
        });

        it('should set current sub view to scope', () => {
            expect(sut.setCurrentSubview).toHaveBeenCalledWith(currentView.defaultSubview);
        });
    });

    describe('set current sub view', () => {

        function getView(subviewActive: boolean): any {
            return {
                _id: 'some id',
                name: 'some name',
                description: 'some desc',
                defaultSubview: 'mapSubview',
                mapSubview: {
                    active: subviewActive
                }
            };
        }

        it('should set sub view to scope', () => {
            const view = getView(true);
            sut.setCurrentView(view);
            sut.setCurrentSubview(view.defaultSubview);

            expect(sut.currentSubview).toEqual(view.defaultSubview);
        });

        it('should not set sub view to scope', () => {
            const view = getView(false);
            sut.setCurrentView(view);
            sut.setCurrentSubview(view.defaultSubview);

            expect(sut.currentSubview).toBeUndefined();
        });

    });
});
