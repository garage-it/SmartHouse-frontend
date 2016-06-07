import {Component} from 'angular2/core';
import template from './device-list.html';
import style from './device-list.scss';
import {DeviceListService} from '../shared/device-list.service';
import {RouterLink} from 'angular2/router';

const selector = 'device-list';
const headersForDisplay = [
    { topic: 'mqttId', name: 'ID', sortable: true },
    { topic: 'type', name: 'Type', sortable: true },
    { topic: 'description', name: 'Description', sortable: true }
];

@Component({
    selector,
    template,
    styles: [style],
    providers: [DeviceListService],
    directives: [RouterLink]
})
export class DeviceList {
    deviceList = [];
    sortBy = '';
    reverse = false;
    _headers = [];

    constructor(deviceListService: DeviceListService) {
        this.deviceListService = deviceListService;
        this._headers = headersForDisplay;
    }

    ngOnInit() {
        this.deviceListService
            .getSensors()
            .subscribe(data => {
                this.deviceList = data;
            });
    }

    setSortBy(sortByValue) {
        this.reverse = this.sortBy === sortByValue ? !this.reverse : false;
        this.sortBy = sortByValue;

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

    get headers() {
        return this._headers;
    }
}
