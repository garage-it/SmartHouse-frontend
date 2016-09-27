import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const style = require('./dashboard.style.scss');
const template = require('./dashboard.template.html');
import { SensorWidgetService } from './shared/sensor-widget/sensor-widget.service';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style]
})
export class DashboardComponent implements OnInit {

    private widgets;
    private sensorWidgets;
    private executorSensorWidgets;
    private servoSensorWidgets;

    constructor(private sensorWidgetService: SensorWidgetService, private route: ActivatedRoute) {
        this.sensorWidgetService = sensorWidgetService;
        this.route = route;

        this.widgets = [];

        this.sensorWidgets = [];
        this.executorSensorWidgets = [];
        this.servoSensorWidgets = [];

    }

    ngOnInit() {
        const widgetsSource = this.route.data
            .flatMap(({widgets}) => Observable.from(widgets.devices));

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
