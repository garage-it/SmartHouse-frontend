import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import style from './style.scss';
import template from './dashboard.html';
import { SensorWidget } from '../components/sensor-widget';
import { SensorExecutorWidget } from '../components/sensor-executor-widget';
import { SensorStatusWidget } from '../components/sensor-status-widget';
import SensorWidgetService from '../components/shared/sensor-widget.service';
import DashboardService from './dashboard.service';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [SensorWidget, SensorExecutorWidget, SensorStatusWidget, RouterLink],
    providers: [DashboardService, SensorWidgetService]
})
export class Dashboard {
    constructor(dashboardService: DashboardService, sensorWidgetService: SensorWidgetService) {
        this.dashboardService = dashboardService;
        this.sensorWidgetService = sensorWidgetService;
        this.widgets = [];
    }

    ngOnInit() {
        this.dashboardService
            .getWidgets()
            .subscribe(({devices}) => {
                this.widgets = devices;
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
