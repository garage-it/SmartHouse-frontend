import { Observable } from 'rxjs/Rx';
import { DashboardViewResolveService } from './dashboard-view-resolve.service';

describe('dashboardViewResolveService', () => {
    let sut;
    let DashboardConstructorService;
    let ToastsManager;
    let successCb;
    let failCb;

    beforeEach(() => {
        successCb = jasmine.createSpy('successCb');
        failCb = jasmine.createSpy('failCb');

        DashboardConstructorService = {
            getWidgets: jasmine.createSpy('getWidgets')
        };

        ToastsManager = {
            error: jasmine.createSpy('error')
        };

        sut = new DashboardViewResolveService(DashboardConstructorService, ToastsManager);
    });

    it('should call dashboardService getWidgets method', () => {
        DashboardConstructorService.getWidgets.and.returnValue(Observable.create());
        sut.resolve();

        expect(DashboardConstructorService.getWidgets).toHaveBeenCalled();
    });

    describe('on get widget fail', () => {
        const error = 'Fake error';

        beforeEach(() => {
            DashboardConstructorService.getWidgets.and.returnValue(Observable.throw(error));
            sut.resolve().subscribe(successCb, failCb);
        });

        it('should cut widgets stream on error', () => {
            expect(ToastsManager.error).toHaveBeenCalledWith(error);
        });

        it('should not emit any values', () => {
            expect(successCb).not.toHaveBeenCalled();
        });

        it('should not emit any errors outside', () => {
            expect(failCb).not.toHaveBeenCalled();
        });
    });

    describe('when success', () => {
        const devices = Symbol('devices');

        beforeEach(() => {
            DashboardConstructorService.getWidgets.and.returnValue(Observable.of({
                devices
            }));
            sut.resolve().subscribe(successCb, failCb);
        });

        it('should get devices', () => {
            expect(successCb).toHaveBeenCalledWith(devices);
        });
    });
});
