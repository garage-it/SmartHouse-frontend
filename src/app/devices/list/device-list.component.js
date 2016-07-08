import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import template from './device-list.html';
import style from './device-list.scss';
import SensorDetailService from '../details/sensor-detail.service';

const selector = 'device-list';
const headersForDisplay = [
    { topic: 'mqttId', name: 'ID', sortable: true },
    { topic: 'type', name: 'Type', sortable: true },
    { topic: 'description', name: 'Description', sortable: true }
];

const confirmQuestion = 'Are you sure you want to delete this device?';

@Component({
    selector,
    template,
    styles: [style],
    providers: [SensorDetailService],
    directives: [RouterLink]
})
export class DeviceList {
    deviceList = [];
    sortBy = '';
    reverse = false;
    _headers = [];

    constructor(sensorsService: SensorDetailService) {
        this.sensorsService = sensorsService;
        this._headers = headersForDisplay;
    }

    ngOnInit() {
        this.sensorsService
            .get()
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

    removeSensor(item) {
        if (!window.confirm(confirmQuestion)) { // eslint-disable-line no-alert
            return;
        }

        this.sensorsService
            .delete(item)
            .subscribe(data => {
                this.deviceList = this.deviceList.filter(elem => elem._id !== data._id);
            });
    }
}
