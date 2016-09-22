import {async, TestBed} from '@angular/core/testing';

import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardService } from './dashboard.service';

import { beforeEachProviders } from '@angular/core/testing';
import { provide } from '@angular/core';

const observableMock = {};

class DashboardServiceMock {
    getWidgets() { return observableMock; }
}

describe('dashboard-resolveService', () => {
    let sut;
    let dashboardService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: DashboardService, useClass: DashboardServiceMock },
                DashboardResolveService
            ]
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.get(DashboardResolveService);
            dashboardService = TestBed.get(DashboardService);
            spyOn(dashboardService, 'getWidgets').and.callThrough();
        });
    }));

    it('should call dashboardService getWidgets method', () => {
        sut.resolve();
        expect(sut.dashboardService.getWidgets).toHaveBeenCalled();
    });
});
