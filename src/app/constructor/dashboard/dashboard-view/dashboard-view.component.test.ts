import { DashboardViewComponent } from './dashboard-view.component';
import { Observable } from 'rxjs';

describe('DashboardView', () => {
    let sut;
    let DialogService;
    let ViewContainerRef;
    let Router;
    let DashboardConstructorService;

    beforeEach(() => {
        DialogService = jasmine.createSpyObj('DialogService', ['confirm']);
        ViewContainerRef = {};
        Router = jasmine.createSpyObj('Router', ['navigate']);
        DashboardConstructorService =
            jasmine.createSpyObj('DashboardConstructorService', ['saveDashboard']);

        sut = new DashboardViewComponent(DialogService, ViewContainerRef, Router, DashboardConstructorService);
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should emit remove widget event', () => {
        const widget = Symbol('Widget');
        sut.removeWidget(widget);
        expect(sut.onRemoveWidget.emit).toHaveBeenCalledWith(widget);
    });

    describe('cancel', () => {
        const confirmOptions = {
            title: '',
            message: 'Do you want to exit without saving?',
            ok: 'Yes',
            cancel: 'No'
        };

        beforeEach(() => {
            DialogService.confirm.and.returnValue(Observable.of(false));
        });

        it('should show confirm dialog', () => {
            sut.cancel();
            expect(DialogService.confirm).toHaveBeenCalledWith(ViewContainerRef, confirmOptions);
        });

        describe('when confirmed', () => {
            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(true));
                sut.cancel();
            });

            it('should navigate to home page', () => {
                expect(Router.navigate).toHaveBeenCalledWith(['/']);
            });
        });

        describe('when not confirmed', () => {
            beforeEach(() => {
                sut.cancel();
            });

            it('should not navigate to home page', () => {
                expect(Router.navigate).not.toHaveBeenCalled();
            });
        });
    });

    describe('save dashboard', () => {
        it('should save dashboard view', () => {
            DashboardConstructorService.saveDashboard.and.returnValue(Observable.of(false));
            sut.save();
            expect(DashboardConstructorService.saveDashboard).toHaveBeenCalledWith(sut.widgets);
        });

        describe('successfully saved', () => {
            it('should redirect to dashboard view page', () => {
                DashboardConstructorService.saveDashboard.and.returnValue(Observable.of(true));
                sut.save();
                expect(Router.navigate).toHaveBeenCalledWith(['/dashboard']);
            });
        });

        describe('not saved', () => {
            it('should redirect to dashboard view page', () => {
                DashboardConstructorService.saveDashboard.and.returnValue(Observable.never());
                sut.save();
                expect(Router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
            });
        });
    });
});
