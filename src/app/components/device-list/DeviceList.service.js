import {Injectable} from 'angular2/core';

@Injectable()
export class DeviceListService {
    getData() {
        const sensorList = [{
            number: '0001',
            type: 'move sensor',
            status: true,
            description: 'In the kitchen room'
        }, {
            number: '0004',
            type: 'temperature sensor',
            status: false,
            description: 'In the kitchen room'
        }, {
            number: '0002',
            type: 'move sensor',
            status: true,
            description: 'In the bathroom'
        }, {
            number: '0003',
            type: 'temperature sensor',
            status: false,
            description: 'In the bathroom'
        }];
        return new Promise((resolve) => {
            resolve(sensorList);
        });
    }
}
