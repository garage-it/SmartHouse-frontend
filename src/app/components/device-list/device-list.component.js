import {Component} from 'angular2/core';
import template from './device-list.html';
import style from './device-list.css';
import {DeviceListService} from './device-list.service';
import {RouterLink} from 'angular2/router';

const selector = 'device-list';

@Component({
    selector,
    template,
    styles: [style],
    providers: [DeviceListService],
    directives: [RouterLink]
})

export class DeviceList {
    constructor(deviceListService: DeviceListService) {
        this.deviceListService = deviceListService;
    }

    ngOnInit() {
        this.deviceListService
            .getSensors()
            .subscribe(data => {
                this.sensors = data;
            });
    }

    sortBy = '';
    reverse = false;

    setSortBy(sortByValue) {
        if (this.sortBy !== sortByValue) {
            this.reverse = false;
            this.sortBy = sortByValue;
        } else {
            this.reverse = !this.reverse;
        }
        this.sensors.sort((a, b) => {
            if (a[sortByValue] < b[sortByValue]) {
                return this.reverse ? 1 : -1;
            }
            if (a[sortByValue] > b[sortByValue]) {
                return this.reverse ? -1 : 1;
            }
            return 0;
        });
    }

    isActive(val) {
        return val === this.sortBy;
    }
}
