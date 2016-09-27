import {async, TestBed} from '@angular/core/testing';

import { Router } from '@angular/router';

import { DashboardEditorComponent } from './dashboard-editor.component';
import { DashboardService } from '../dashboard.service';

describe('DashboardEditor', () => {
    let sut;
    let router;
    let dashboardService;

    beforeEach(async(() => {
        dashboardService = jasmine.createSpyComponent(DashboardService);
        router = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            declarations: [DashboardEditorComponent],
            providers: [
                {provide: DashboardService, useValue: dashboardService},
                {provide: Router, useValue: router}
            ]
        })
        .overrideComponent(DashboardEditorComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(DashboardEditorComponent).componentInstance;
        });
    }));

    describe('On Init', () => {
        let subscribeHandler;
        const devices = [{mqttId: 'test'}];
        const responseData = {devices};

        beforeEach(() => {
            dashboardService.getWidgets.and.returnValue({
                subscribe: (callback) => {
                    subscribeHandler = callback;
                }
            });
            sut.ngOnInit();
        });

        it('should get widgets', () => {
            expect(dashboardService.getWidgets).toHaveBeenCalled();
        });

        it('should store received widgets', () => {
            subscribeHandler(responseData);
            expect(sut.widgets).toEqual(devices);
        });

        it('should set initial data', () => {
            subscribeHandler(responseData);
            expect(sut.initialData).toEqual(devices);
        });
    });

    describe('#applyChanges', () => {
        beforeEach(() => {
            spyOn(sut, 'exitEditMode');
            dashboardService.applyChanges.and.returnValue({ subscribe(fn) { fn(); } });
            sut.applyChanges([]);
        });

        it('should save changes', () => {
            expect(dashboardService.applyChanges).toHaveBeenCalledWith([]);
        });

        it('should exit edit mode', () => {
            expect(sut.exitEditMode).toHaveBeenCalled();
        });
    });

    describe('#exitEditMode', () => {
        it('should exit edit mode', () => {
            sut.exitEditMode();
            expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
        });
    });

    describe('#isApplyDisabled', () => {
        it('should disable apply button if there is nothing to save', () => {
            dashboardService.compareWidgetsLists.and.returnValue(true);
            expect(sut.isApplyDisabled()).toBe(true);
        });

        it('should enable apply button if there are any changes', () => {
            dashboardService.compareWidgetsLists.and.returnValue(false);
            expect(sut.isApplyDisabled()).toBe(false);
        });
    });
});
