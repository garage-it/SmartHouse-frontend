export default class {
    constructor(devices) {
        this.devices = devices;
        this.selectedDevice = null;
        this.conditions = [
            {id: 'GREATER_THAN', name: 'GREATER THAN', sign: '>'},
            {id: 'GREATER_THAN_OR_EQUAL_TO', name: 'GREATER OR EQUAL', sign: '>='},
            {id: 'LESS_THAN', name: 'LESS THAN', sign: '<'},
            {id: 'LESS_THAN_OR_EQUAL_TO', name: 'LESS THAN OR EQUAL TO', sign: '<='},
            {id: 'EQUAL_TO', name: 'EQUAL TO', sign: '=='},
            {id: 'NOT_EQUAL', name: 'NOT EQUAL', sign: '!='}
        ];
        this.selectedCondition = null;
        this.value = '';
    }
}
