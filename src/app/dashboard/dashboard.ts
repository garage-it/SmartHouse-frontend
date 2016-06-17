import { Component } from 'angular2/core';

const style = require('./style.scss');
const template = require('./dashboard.html');
import { SensorWidget } from '../components/sensor-widget';
import { SensorExecutorWidget } from '../components/sensor-executor-widget';
import { SensorStatusWidget } from '../components/sensor-status-widget';
import { DeviceListService } from '../components/shared/device-list.service';
import { RouterLink } from 'angular2/router';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [SensorWidget, SensorExecutorWidget, SensorStatusWidget, RouterLink],
    providers: [DeviceListService]
})
export class Dashboard {
    deviceListService: any;
    sensors: any;
    executors: any;

    constructor(deviceListService: DeviceListService) {
        this.deviceListService = deviceListService;
        this.sensors = [];
        this.executors = [];
    }

    ngOnInit() {
        this.deviceListService
            .getSensors()
            .subscribe(data => {
                this.sensors = data.filter(element => !element.executor);
                this.executors = data.filter(element => element.executor);
            });
    }

    isDashboardEmpty() {
        return !this.sensors.length && !this.executors.length;
    }
}
