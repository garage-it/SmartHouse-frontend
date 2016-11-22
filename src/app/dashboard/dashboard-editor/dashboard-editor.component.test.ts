import { DashboardEditorComponent } from './dashboard-editor.component';
import { Observable } from 'rxjs/Rx';

describe('DashboardEditor', () => {
    let sut;
    let router;
    let dragulaService;
    let dashboardService;

    beforeEach(() => {
        dashboardService = {
            getWidgets: jasmine.createSpy('getWidgets'),
            applyChanges: jasmine.createSpy('applyChanges'),
            compareWidgetsLists: jasmine.createSpy('compareWidgetsLists')
        };
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        dragulaService = {
            setOptions: jasmine.createSpy('setOptions'),
            destroy: jasmine.createSpy('destroy')
        };
        sut = new DashboardEditorComponent(dashboardService, router, dragulaService);
    });

    describe('On Init', () => {
        const devices = Symbol('devices');

        beforeEach(() => {
            dashboardService.getWidgets.and.returnValue(Observable.of({ devices }));
            spyOn(sut, 'setInitialData');
            sut.ngOnInit();
        });

        it('should get widgets', () => {
            expect(dashboardService.getWidgets).toHaveBeenCalled();
        });

        it('should store received widgets', () => {
            expect(sut.widgets).toEqual(devices);
        });

        it('should set initial data', () => {
            expect(sut.setInitialData).toHaveBeenCalledWith(devices);
        });

        it('should set initial data of drag and drop', () => {
            expect(dragulaService.setOptions).toHaveBeenCalledWith('sh-dashboard-editor', {
                revertOnSpill: true,
                direction: 'horizontal'
            });
        });
    });

    describe('On Destroy', () => {
        beforeEach(() => {
            sut.ngOnDestroy();
        });

        it('should destroy drag and drop listeners when component is destroyed', () => {
            expect(dragulaService.destroy).toHaveBeenCalledWith('sh-dashboard-editor');
        });
    });

    describe('on apply changes', () => {
        const currentWidgets = Symbol('current widget');

        beforeEach(() => {
            spyOn(sut, 'exitEditMode');
            sut.widgets = currentWidgets;
            dashboardService.applyChanges.and.returnValue(Observable.of(Symbol('something')));
            sut.applyChanges();
        });

        it('should save changes', () => {
            expect(dashboardService.applyChanges).toHaveBeenCalledWith(currentWidgets);
        });

        it('should exit edit mode after successfully changenges applied', () => {
            expect(sut.exitEditMode).toHaveBeenCalled();
        });
    });

    describe('exit edit mode', () => {
        beforeEach(() => {
            sut.exitEditMode();
        });

        it('should exit edit mode', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
        });
    });

    describe('is apply disabled', () => {
        const areSimilar = Symbol('are widgets lists similar');
        const initialWidgets = Symbol('initial widgets list');
        const updatedWidgets = Symbol('updatet widgets list');

        beforeEach(() => {
            sut.initialData = initialWidgets;
            sut.widgets = updatedWidgets;
            dashboardService.compareWidgetsLists.and.returnValue(areSimilar);
            sut.isApplyDisabled();
        });

        it('should check are widgets list simmilar', () => {
            expect(dashboardService.compareWidgetsLists)
                .toHaveBeenCalledWith(initialWidgets, updatedWidgets);
        });

        it('should enable apply button if there are any changes', () => {
            expect(sut.isApplyDisabled()).toBe(areSimilar);
        });
    });
});
