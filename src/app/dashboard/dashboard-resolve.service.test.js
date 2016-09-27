import { DashboardResolveService } from './dashboard-resolve.service';
import DashboardService from './dashboard.service';

import { beforeEachProviders } from '@angular/core/testing';
import { provide } from '@angular/core';

const observableMock = {};

class DashboardServiceMock {
    getWidgets() { return observableMock; }
}

describe('dashboard-resolveService service', () => {
    let sut;
    let dashboardService;

    beforeEachProviders(() => [
        provide(DashboardService, {useClass: DashboardServiceMock})
    ]);

    beforeEach(() => {
        dashboardService = new DashboardServiceMock();
        sut = new DashboardResolveService(dashboardService);

        spyOn(dashboardService, 'getWidgets').and.callThrough();
    });

    it('should call dashboardService getWidgets method', () => {
        sut.resolve();
        expect(sut.dashboardService.getWidgets).toHaveBeenCalled();
    });
});
