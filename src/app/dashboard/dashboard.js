import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import style from './style.scss';
import template from './dashboard.html';
import { SensorWidget } from '../components/sensor-widget';
import { SensorExecutorWidget } from '../components/sensor-executor-widget';
import { SensorStatusWidget } from '../components/sensor-status-widget';
import DashboardService from './dashboard.service';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [SensorWidget, SensorExecutorWidget, SensorStatusWidget, RouterLink],
    providers: [DashboardService]
})
export class Dashboard {
    constructor(dashboardService: DashboardService) {
        this.dashboardService = dashboardService;
        this.devices = [];
    }

    ngOnInit() {
        this.dashboardService
            .getWidgets()
            .subscribe(({devices}) => {
                this.devices = devices;
            });
    }

    isDashboardEmpty() {
        return !this.devices.length;
    }
}
