import { DashboardViewComponent } from './dashboard-view.component';
import { Observable } from 'rxjs';

describe('DashboardView', () => {
    let sut;
    let DialogService;
    let ViewContainerRef;
    let Router;
    

    beforeEach(() => {
        DialogService = jasmine.createSpyObj('DialogService', ['confirm']);
        ViewContainerRef = {};
        Router = jasmine.createSpyObj('Router', ['navigate']);

        sut = new DashboardViewComponent(DialogService, ViewContainerRef, Router);
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
                DialogService.confirm.and.returnValue(Observable.of(1));
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
});
