export class DeviceListService {
    getData() {
        let sensorList = [{
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
        }];
        return new Promise((resolve) => {
            resolve(sensorList);
        });
    }
}
