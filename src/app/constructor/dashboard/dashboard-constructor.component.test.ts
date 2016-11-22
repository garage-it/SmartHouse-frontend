import { DashboardConstructorComponent } from './dashboard-constructor.component';
import { Observable } from 'rxjs';

const device = {device: {}};
const mockWidgets = {
    widgets: {
        devices: [device]
    }
};

describe('DashboardConstructor', () => {
    let sut;
    let ActivatedRoute;



    beforeEach(() => {
        ActivatedRoute = {
            data: Observable.of(mockWidgets)
        };
        sut = new DashboardConstructorComponent(ActivatedRoute);
    });

    describe('on init', () => {
        it('should receive widgets from state', (done) => {
            sut.ngOnInit();
            done();
            expect(sut.widgets).toEqual(mockWidgets.widgets.devices);
        });

    });

    describe('on add widget', () => {
        const widgetId = Math.random();
        let widget;

        beforeEach(() => {
            widget = {
                _id: widgetId
            };
            sut.widgetList = [widget];
            sut.onAddWidget(widget);
        });

        it('should add widget to dashboard', () => {
            expect(sut.widgets[0]).toEqual(widget);
        });

        it('should remove widget from widget list', () => {
            expect(sut.widgetList.length).toEqual(0);
        });
    });

    describe('on remove widget', () => {
        const widgetId = Math.random();
        let widget;

        beforeEach(() => {
            widget = {
                _id: widgetId
            };
            sut.widgets = [widget];
            sut.onRemoveWidget(widget);
        });

        it('should add widget to widget list', () => {
            expect(sut.widgetList[0]).toEqual(widget);
        });

        it('should remove widget from dashboard', () => {
            expect(sut.widgets.length).toEqual(0);
        });
    });
});
