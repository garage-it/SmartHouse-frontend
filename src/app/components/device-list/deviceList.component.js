import {Component} from 'angular2/core';
import template from './deviceList.html';
import style from './deviceList.css';
import {DeviceListService} from './DeviceList.service';

const selector = 'device-list';

@Component({
    selector,
    template,
    styles: [style],
    providers: [DeviceListService]
})

export class DeviceList {
    constructor(deviceListService: DeviceListService) {
        deviceListService.getData().then((data) => {
            this.deviceList = data;
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
        this.deviceList.sort((a, b) => {
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
