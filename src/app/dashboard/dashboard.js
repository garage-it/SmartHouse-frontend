import style from './style.scss';
import template from './dashboard.html';
import {Component} from 'angular2/core';
import {SensorWidget} from '../components/sensor-widget';
import {DeviceListService} from '../components/shared/device-list.service';

@Component({
    selector: 'sm-dashboard',
    template,
    styles: [style],
    directives: [SensorWidget],
    providers: [DeviceListService]
})
export class Dashboard {
    constructor(deviceListService: DeviceListService) {
        this.deviceListService = deviceListService;
    }

    ngOnInit() {
        this.deviceListService
            .getSensors()
            .subscribe(data => {
                this.deviceList = data;
            });
    }
}
