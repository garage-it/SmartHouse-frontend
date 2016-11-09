import { Observable } from 'rxjs/Rx';
import { fakeAsync, tick } from '@angular/core/testing';
import { DashboardResolveService } from './dashboard-resolve.service';

describe('dashboard-resolveService', () => {
    let sut;
    let DashboardService;
    let ToastsManager;

    beforeEach(() => {

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


    xit('should cut widgets stream on error', fakeAsync(() => {
        const error = 'Fake error';

        DashboardService.getWidgets.and.returnValue(Observable.throw(error));
        sut.resolve();
        tick(1000);

        expect(ToastsManager.error).toHaveBeenCalledWith(error);
    }));
});
