export default class {
    constructor(devices) {
        this.devices = devices;
        this.selectedDevice = null;
        this.conditions = [
            {id: 0, name: 'greater than', sing: '>'},
            {id: 1, name: 'greater or equal', sing: '>='},
            {id: 2, name: 'less than', sing: '<'},
            {id: 3, name: 'less or equal', sing: '<='},
            {id: 4, name: 'equal', sing: '=='},
            {id: 5, name: 'not equal', sing: '!='}
        ];
        this.selectedCondition = null;
        this.value = '';
    }
}
