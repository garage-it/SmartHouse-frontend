import { WidgetComponent } from './widget.component';

describe('Widget', () => {
    let sut;

    beforeEach(() => {
        sut = new WidgetComponent();
        sut.widget = Symbol('Widget');
        sut.onRemoveWidget.emit = jasmine.createSpy('emit');
    });

    it('should emit remove widget event', () => {
        sut.removeWidget();
        expect(sut.onRemoveWidget.emit).toHaveBeenCalledWith(sut.widget);
    });
});
