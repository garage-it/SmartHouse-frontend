import { WidgetListComponent } from './widget-list.component';

describe('WidgetList', () => {
    let sut;

    beforeEach(() => {
        sut = new WidgetListComponent();
        sut.onAddWidget.emit = jasmine.createSpy('emit');
    });

    it('should emit add widget event', () => {
        const widget = Symbol('Widget');
        sut.addWidget(widget);
        expect(sut.onAddWidget.emit).toHaveBeenCalledWith(widget);
    });
});
