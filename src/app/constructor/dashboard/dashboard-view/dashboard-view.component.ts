import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Widget } from '../../../dashboard/widget.model';

@Component({
    selector: 'sh-dashboard-view',
    templateUrl: './dashboard-view.template.html',
    styleUrls: ['./dashboard-view.style.scss']
})
export class DashboardViewComponent {
    @Input() widgets: Widget[];
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    removeWidget(widget) {
        this.onRemoveWidget.emit(widget);
    }
}
