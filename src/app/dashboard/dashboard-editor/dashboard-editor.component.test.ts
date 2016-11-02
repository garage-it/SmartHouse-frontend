import {async, TestBed} from '@angular/core/testing';

import { Router } from '@angular/router';

import { DashboardEditorComponent } from './dashboard-editor.component';
import { DashboardService } from '../dashboard.service';
import { DragulaService} from 'ng2-dragula/ng2-dragula';

describe('DashboardEditor', () => {
    let sut;
    let router;
    let dragulaService;
    let dashboardService;

    beforeEach(async(() => {
        dashboardService = jasmine.createSpyComponent(DashboardService);
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        dragulaService = jasmine.createSpyComponent(DragulaService);

        TestBed.configureTestingModule({
            declarations: [DashboardEditorComponent],
            providers: [
                {provide: DashboardService, useValue: dashboardService},
                {provide: Router, useValue: router},
                {provide: DragulaService, useValue: dragulaService}
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

        it('should set initial data of drag and drop', () => {
            expect(dragulaService.setOptions).toHaveBeenCalledWith('dashboard-editor', {
                revertOnSpill: true,
                direction: 'horizontal'
            });
        });
    });

    describe('On Destroy', () => {
        it('should destroy drag and drop listeners when component is destroyed', () => {
            sut.ngOnDestroy();
            expect(dragulaService.destroy).toHaveBeenCalledWith('dashboard-editor');
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
