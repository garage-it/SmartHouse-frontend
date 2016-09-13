import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import style from './style.scss';
import template from './dashboard.html';
import { SensorWidget } from './sensor-widget';
import { SensorExecutorWidget } from './sensor-executor-widget';
import { SensorStatusWidget } from './sensor-status-widget';
import SensorWidgetService from './shared/sensor-widget.service';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [ROUTER_DIRECTIVES, SensorWidget, SensorExecutorWidget, SensorStatusWidget],
    providers: [SensorWidgetService]
})
export class Dashboard {
    constructor(sensorWidgetService: SensorWidgetService,
                route: ActivatedRoute) {
        this.sensorWidgetService = sensorWidgetService;
        this.route = route;
        this.widgets = [];
    }

    ngOnInit() {
        this.route.data.subscribe(({devices}) => {
            this.widgets = devices.devices;
        });

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
