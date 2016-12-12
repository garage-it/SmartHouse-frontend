import { DashboardViewComponent } from './dashboard-view.component';
import { Observable } from 'rxjs';

describe('DashboardView', () => {
    let sut;
    let Router;
    let DashboardConstructorService;

    beforeEach(() => {
        Router = jasmine.createSpyObj('Router', ['navigate']);
        DashboardConstructorService =
            jasmine.createSpyObj('DashboardConstructorService', ['saveDashboard']);

        sut = new DashboardViewComponent(Router, DashboardConstructorService);
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should emit remove widget event', () => {
        const widget = Symbol('Widget');
        sut.removeWidget(widget);
        expect(sut.onRemoveWidget.emit).toHaveBeenCalledWith(widget);
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
                expect(Router.navigate).toHaveBeenCalledWith(['/']);
            });
        });

        describe('not saved', () => {
            it('should redirect to dashboard view page', () => {
                DashboardConstructorService.saveDashboard.and.returnValue(Observable.never());
                sut.save();
                expect(Router.navigate).not.toHaveBeenCalledWith(['/']);
            });
        });
    });
});
