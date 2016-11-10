import { DashboardService } from './dashboard.service';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('DashboardService', () => {
    let httpMock;
    let httpUtilsMock;
    let successCb;
    let failCb;
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
        successCb = jasmine.createSpy('successCb');
        failCb = jasmine.createSpy('failCb');
        httpUtilsMock = {
            extractErrorMessage: jasmine.createSpy('extractErrorMessage')
        };
        httpMock = jasmine.createSpyObj('mock http', ['get', 'put', 'getByParams']);
    });

    beforeEach(() => {
        sut = new DashboardService(httpMock, httpUtilsMock);
    });

    describe('#getWidgets', () => {
        beforeEach(() => {
            httpMock.get.and.returnValue(Observable.create());
            sut.getWidgets();
        });

        it('should get widgets of the dashboard from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/dashboard');
        });

        describe('on get widgets error', () => {
            let error;
            let errorMessage;

            beforeEach(() => {
                error = Symbol('some server error');
                errorMessage = Symbol('some error message');
                httpMock.get.and.returnValue(Observable.throw(error));
                httpUtilsMock.extractErrorMessage.and.returnValue(Observable.throw(errorMessage));
                sut.getWidgets().subscribe(successCb, failCb);
            });

            it('should extract error message', () => {
                expect(httpUtilsMock.extractErrorMessage).toHaveBeenCalledWith(error);
            });

            it('should delegate error handling outside', () => {
                expect(failCb).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    describe('#getStatistics', () => {
        let deviceId, period;

        beforeEach(() => {
            deviceId = Math.random();
            period = Math.random();
            sut.getStatistic(deviceId, period);
        });

        it('should get statistics of the sensor from the server', () => {
            let params = new URLSearchParams();
            params.set('period', period);
            params.set('sensor', deviceId);
            expect(httpMock.getByParams).toHaveBeenCalledWith('/timeseries', params);
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
