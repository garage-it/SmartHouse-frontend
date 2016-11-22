import { Component } from '@angular/core';
import { Widget } from '../../dashboard/widget.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {

    private widgets: Widget[] = [];
    private widgetList: Widget[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const widgetsSource = this.route.data
            .flatMap(({ widgets: { devices } }) => Observable.from(devices));

        widgetsSource
            .subscribe(widget => {
                widget.hidden
                    ? this.widgetList.push(widget)
                    : this.widgets.push(widget);
            });
    }

    onAddWidget(widget): void {
        this.widgets.push(widget);
        this.widgetList = this.widgetList.filter(filteredWidget => filteredWidget._id !== widget._id);
    }

    onRemoveWidget(widget): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget._id !== widget._id);
        this.widgetList.push(widget);
    }
}
