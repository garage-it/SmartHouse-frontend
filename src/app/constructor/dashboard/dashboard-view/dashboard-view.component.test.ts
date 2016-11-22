import { DashboardViewComponent } from './dashboard-view.component';

describe('DashboardView', () => {
    let sut;

    beforeEach(() => {
        sut = new DashboardViewComponent();
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should emit remove widget event', () => {
        const widget = Symbol('Widget');
        sut.removeWidget(widget);
        expect(sut.onRemoveWidget.emit).toHaveBeenCalledWith(widget);
    });
});
