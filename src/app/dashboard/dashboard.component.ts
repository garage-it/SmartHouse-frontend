import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';
import { Widget } from './dashboard.interfaces';

const style = require('./dashboard.style.scss');
const template = require('./dashboard.template.html');

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style]
})
export class DashboardComponent implements OnInit {

    private widgets: Widget[] = [];

    constructor(private sensorWidgetService: SensorWidgetService, private route: ActivatedRoute) { }

    ngOnInit() {
        const widgetsSource = this.route.data
            .flatMap(({ widgets: { devices } }) => Observable.from(devices))
            .filter(device => !device.hidden);

        widgetsSource
            .subscribe(widget => this.widgets.push(widget));

        this.sensorWidgetService
            .subscribe(false, data => this.onDeviceAddEvent(data));
    }

    onDeviceAddEvent(data) {
        if (data.event === 'device-add') {
            this.widgets.push({
                device: data.data,
                hidden: false
            });
        }
    }

    isDashboardEmpty() {
        return !this.widgets.length;
    }
}
