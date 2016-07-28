import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import style from './style.scss';
import template from './dashboard.html';
import { SensorWidget } from './sensor-widget';
import { SensorExecutorWidget } from './sensor-executor-widget';
import { SensorStatusWidget } from './sensor-status-widget';
import SensorWidgetService from './shared/sensor-widget.service';
import DashboardService from './dashboard.service';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [ROUTER_DIRECTIVES, SensorWidget, SensorExecutorWidget, SensorStatusWidget],
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

    ngOnDestroy() {
        this.sensorWidgetService.closeScocketSession();
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
