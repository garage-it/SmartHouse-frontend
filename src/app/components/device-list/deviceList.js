import {Component} from 'angular2/core';
import template from './deviceList.html';
import style from './deviceList.css';
import {DeviceListService} from './DeviceListService';

const selector = 'device-list';

@Component({
    selector,
    template,
    styles: [style]
})
export class DeviceList {

    constructor() {
        let deviceListService = new DeviceListService();
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
