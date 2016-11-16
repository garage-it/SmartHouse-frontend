import { Observable } from 'rxjs/Rx';
import { DashboardResolveService } from './dashboard-resolve.service';

describe('dashboard-resolveService', () => {
    let sut;
    let DashboardService;
    let ToastsManager;
    let successCb;
    let failCb;

    beforeEach(() => {
        successCb = jasmine.createSpy('successCb');
        failCb = jasmine.createSpy('failCb');

        DashboardService = {
            getWidgets: jasmine.createSpy('getWidgets')
        };

        ToastsManager = {
            error: jasmine.createSpy('error')
        };

        sut = new DashboardResolveService(DashboardService, ToastsManager);
    });

    it('should call dashboardService getWidgets method', () => {
        DashboardService.getWidgets.and.returnValue(Observable.create());
        sut.resolve();

        expect(sut.dashboardService.getWidgets).toHaveBeenCalled();
    });

    describe('on get widget fail', () => {
        const error = 'Fake error';

        beforeEach(() => {
            DashboardService.getWidgets.and.returnValue(Observable.throw(error));
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


});
