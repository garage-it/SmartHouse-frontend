import {Component} from 'angular2/core';

@Component({
    selector: 'device-list',
    template: require('./deviceList.html')
})
export class DeviceList {
    deviceList = [{
        number: '0001',
        type: 'move sensor',
        status: 'active',
        description: 'In the kitchen room'
    }, {
        number: '0004',
        type: 'temperature sensor',
        status: 'inactive',
        description: 'In the kitchen room'
    }, {
        number: '0002',
        type: 'move sensor',
        status: 'active',
        description: 'In the bathroom'
    }, {
        number: '0003',
        type: 'temperature sensor',
        status: 'shadow',
        description: 'In the bathroom'
    }]
    sortBy = ''
    reverse = false

    setSortBy(sortByValue) {
        if (this.sortBy !== sortByValue) {
            this.reverse = false;
            this.sortBy = sortByValue;
        }
        else {
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
