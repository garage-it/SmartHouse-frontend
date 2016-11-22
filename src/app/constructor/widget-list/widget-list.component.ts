import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Widget } from '../../dashboard/widget.model';

@Component({
    selector: 'sh-widget-list',
    templateUrl: './widget-list.template.html',
    styleUrls: ['./widget-list.style.scss']
})
export class WidgetListComponent {

    @Input() widgets: Widget[];
    @Output() onAddWidget: EventEmitter<any> = new EventEmitter();

    addWidget(widget): void {
        this.onAddWidget.emit(widget);
    }
}
