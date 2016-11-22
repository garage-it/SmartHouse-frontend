import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Widget } from '../../../../dashboard/widget.model';

@Component({
    selector: 'sh-widget',
    templateUrl: './widget.template.html',
    styleUrls: ['./widget.style.scss']
})
export class WidgetComponent {
    @Input() widget: Widget;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    removeWidget(): void {
        this.onRemoveWidget.emit(this.widget);
    }
}
