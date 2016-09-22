import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import style from './dashboard.style.scss';
import template from './dashboard.template.html';
import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';

import Rx from 'rxjs/Rx';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style]
})
export class DashboardComponent {
    constructor(sensorWidgetService: SensorWidgetService, route: ActivatedRoute) {
        this.sensorWidgetService = sensorWidgetService;
        this.route = route;
        this.widgets = [];

        this.sensorWidgets = [];
        this.executorSensorWidgets = [];
        this.servoSensorWidgets = [];
    }

    ngOnInit() {
        const widgetsSource = this.route.data
            .flatMap(({widgets}) => Rx.Observable.from(widgets.devices));

        widgetsSource
            .subscribe(widget => this.widgets.push(widget));

        widgetsSource
            .filter(widget => widget.device.executor === true)
            .subscribe(widget => this.executorSensorWidgets.push(widget));

        widgetsSource
            .filter(widget => widget.device.servo === true)
            .subscribe(widget => this.servoSensorWidgets.push(widget));

        widgetsSource
            .filter(widget => !(widget.device.executor || widget.device.servo))
            .subscribe(widget => this.sensorWidgets.push(widget));

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
