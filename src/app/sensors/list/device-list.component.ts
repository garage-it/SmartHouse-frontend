import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

const template = require('./device-list.html');
const style = require('./device-list.scss');
import SensorDetailService from '../details/sensor-detail.service';

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
    providers: [SensorDetailService],
    directives: [RouterLink]
})
export class DeviceList {
    deviceList = [];
    sortBy = '';
    reverse = false;
    _headers = [];
    sensorsService: any;

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
        this.sensorsService
            .delete(item)
            .subscribe(data => {
                const removedSensor = JSON.parse(data._body);

                if (data.status === 200) {
                    this.deviceList = this.deviceList
                        .filter(elem => elem._id !== removedSensor._id);
                }
            });
    }
}
