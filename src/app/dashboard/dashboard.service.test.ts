import { DashboardService } from './dashboard.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('DashboardService', () => {
    let observable;
    let httpMock;
    let sut;
    const widgets = [
        {
            _id: '1',
            mqttId: 'test',
            metrics: 'test',
            type: 'test',
            description: 'test',
            executor: false,
            hidden: false
        }
    ];

    beforeEach(() => {
        observable = Observable.create(observer => {
            observer.next(widgets);
            observer.complete();
        });
        httpMock = jasmine.createSpyComponent(Http);
        const methods = ['put', 'get'];
        methods.forEach((method) => httpMock[method].and.returnValue(observable));
    });

    beforeEach(() => {
        sut = new DashboardService(httpMock);
    });

    describe('#getWidgets', () => {
        beforeEach(() => {
            sut.getWidgets();
        });

        it('should get widgets of the dashboard from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/dashboard');
        });
    });

    describe('#applyChanges', () => {
        beforeEach(() => {
            sut.applyChanges(widgets);
        });

        it('should save changes of widgets', () => {
            expect(httpMock.put).toHaveBeenCalledWith('/dashboard', {devices: widgets});
        });
    });

    describe('#compareWidgetsLists', () => {
        let updatedData;
        beforeEach(() => {
            updatedData = widgets.map((widget) => Object.assign({}, widget));
        });

        it('should compare two widgets list', () => {
            updatedData[0].hidden = true;
            expect(sut.compareWidgetsLists(widgets, updatedData)).toBe(false);
        });

        it('should be truthy if lists are equal', () => {
            updatedData[0].hidden = false;
            expect(sut.compareWidgetsLists(widgets, updatedData)).toBe(true);
        });
    });
});
