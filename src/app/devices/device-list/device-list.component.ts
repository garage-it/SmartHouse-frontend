import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SensorDetailService } from '../shared/sensor-detail.service';
import { DialogService } from '../../shared/dialog/dialog.service';

const headersForDisplay = [
    { topic: 'mqttId', name: 'ID', sortable: true },
    { topic: 'type', name: 'Type', sortable: true },
    { topic: 'description', name: 'Description', sortable: true }
];

@Component({
    selector: 'device-list',
    templateUrl: './device-list.template.html',
    styleUrls: ['./device-list.style.scss']
})
export class DeviceListComponent implements OnInit {
    private deviceList = [];
    private sortBy = '';
    private reverse = false;
    private _headers = [];

    constructor(
        private sensorsService: SensorDetailService,
        private route: ActivatedRoute,
        private dialogService: DialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this._headers = headersForDisplay;
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.deviceList = data['deviceList'];
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
        const confirmOptions = {
            title: '',
            message: 'Are you sure you want to delete this device?'
        };

        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(isConfirmed => isConfirmed)
            .subscribe(() => {
                this.sensorsService
                    .delete(item)
                    .subscribe(data => {
                        this.deviceList = this.deviceList.filter(elem => elem._id !== data._id);
                    });
            });
    }
}
