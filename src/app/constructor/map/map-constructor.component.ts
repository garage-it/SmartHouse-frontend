import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../../dashboard/widget.model';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html'
})
export class MapConstructorComponent {

    private widgets: Widget[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const widgetsSource = this.route.data
            .flatMap(({ widgets: { devices } }) => Observable.from(devices));

        widgetsSource
            .subscribe(widget => this.widgets.push(widget));
    }

    onAddWidget(widget): void {
    }
}
