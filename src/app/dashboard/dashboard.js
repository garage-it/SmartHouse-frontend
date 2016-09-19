import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import style from './style.scss';
import template from './dashboard.html';
import { SensorWidget } from './sensor-widget';
import { SensorExecutorWidget } from './sensor-executor-widget';
import { SensorServoWidget } from './sensor-servo-widget';
import { SensorStatusWidget } from './sensor-status-widget';
import SensorWidgetService from './shared/sensor-widget.service';

import Rx from 'rxjs/Rx';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [
        ROUTER_DIRECTIVES, SensorWidget, SensorExecutorWidget,
        SensorStatusWidget, SensorServoWidget
    ],
    providers: [SensorWidgetService]
})
export class Dashboard {
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
