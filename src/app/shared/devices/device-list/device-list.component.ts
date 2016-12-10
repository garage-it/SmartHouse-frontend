import { Component, ViewContainerRef, Input } from '@angular/core';

import { DevicesService } from '../devices.service';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { Device } from '../device.model';

const headersForDisplay = [
    { topic: 'mqttId', name: 'ID', sortable: true },
    { topic: 'type', name: 'Type', sortable: true },
    { topic: 'description', name: 'Description', sortable: true }
];

@Component({
    selector: 'sh-device-list',
    templateUrl: './device-list.template.html',
    styleUrls: ['./device-list.style.scss']
})
export class DeviceListComponent {
    @Input() deviceList: Array<Device>;
    @Input() showDeleteButton: boolean = true;
    @Input() showStatisticLink: boolean = true;

    private sortBy = '';
    private reverse = false;
    private _headers = [];

    constructor(
        private devicesService: DevicesService,
        private dialogService: DialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this._headers = headersForDisplay;
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

    removeSensor(item) {
        const confirmOptions = {
            title: '',
            message: 'Are you sure you want to delete this device?'
        };

        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(isConfirmed => isConfirmed)
            .subscribe(() => {
                this.devicesService
                    .delete(item)
                    .subscribe(data => {
                        this.deviceList = this.deviceList.filter(elem => elem._id !== data._id);
                    });
            });
    }

    get headers() {
        return this._headers;
    }
}
