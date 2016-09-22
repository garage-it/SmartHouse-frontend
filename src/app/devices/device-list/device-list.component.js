import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import template from './device-list.template.html';
import style from './device-list.style.scss';

import { SensorDetailService } from '../shared/sensor-detail.service';

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
    styles: [style]
})
export class DeviceListComponent {
    deviceList = [];
    sortBy = '';
    reverse = false;
    _headers = [];

    constructor(sensorsService: SensorDetailService, route: ActivatedRoute) {
        this.sensorsService = sensorsService;
        this._headers = headersForDisplay;
        this.route = route;
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.deviceList = data.deviceList;
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
