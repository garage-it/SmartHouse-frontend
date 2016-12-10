import { DashboardConstructorService } from './dashboard-constructor.service';
import { Observable } from 'rxjs/Observable';

describe('DashboardConstructorService', () => {
    let httpMock;
    let httpUtilsMock;
    let successCb;
    let failCb;
    let sut;

    beforeEach(() => {
        successCb = jasmine.createSpy('successCb');
        failCb = jasmine.createSpy('failCb');
        httpUtilsMock = {
            extractErrorMessage: jasmine.createSpy('extractErrorMessage')
        };
        httpMock = jasmine.createSpyObj('mock http', ['get', 'post']);
    });

    beforeEach(() => {
        sut = new DashboardConstructorService(httpMock, httpUtilsMock);
    });

    describe('get widgets', () => {
        beforeEach(() => {
            httpMock.get.and.returnValue(Observable.create());
            sut.getWidgets();
        });

        it('should get widgets of the dashboard from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/dashboard');
        });

        describe('on get widgets error', () => {
            const error = Symbol('some server error');
            const errorMessage = Symbol('some error message');

            beforeEach(() => {
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

    describe('save dashboard', () => {
        const widgets = Symbol('Widgets');

        beforeEach(() => {
            sut.saveDashboard(widgets);
        });

        it('should save dashboard with widgets', () => {
            expect(httpMock.post).toHaveBeenCalledWith('/dashboard', {devices: widgets});
        });
    });
});
