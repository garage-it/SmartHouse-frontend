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
            subscribedData = {
                viewList: [
                    {
                        name: 'View 1',
                        default: 'MapSubview',
                        mapSubview: {
                            active: true,
                            sensors: [],
                            pictureName: ''
                        },
                        dashboardSubview: null
                    },
                    {
                        name: 'View 2',
                        default: 'MapSubview',
                        mapSubview: {
                            active: true,
                            sensors: [],
                            pictureName: ''
                        },
                        dashboardSubview: null
                    },
                    {
                        name: 'View 3',
                        default: 'DashboardSubview',
                        mapSubview: null,
                        dashboardSubview: {
                            active: true,
                            sensors: []
                        }
                    }
                ]
            };
            sut.ngOnInit();
            ActivatedRoute.data.subscribe.calls.first().args[0](subscribedData);
        });

        it('should subscribe to resolved data from current route', () => {
            expect(ActivatedRoute.data.subscribe).toHaveBeenCalled();
        });

        it('should set resolved list of map views to scope', () => {
            expect(sut.viewList).toBe(subscribedData.viewList);
        });

        it('should set default view', () => {
            expect(sut.currentView).toBe(subscribedData.viewList[0]);
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

    describe('on current view change', () => {
        let newView;

        beforeEach(() => {
            newView = {
                default: 'DashboardSubview'
            };
            sut.setCurrentView(newView);
        });

        it('should set changed view to scope', () => {
            expect(sut.currentView).toEqual(newView);
        });

        it('should set changed default subview to scope', () => {
            expect(sut.currentSubview).toEqual(newView.default);
        });
    });
});
