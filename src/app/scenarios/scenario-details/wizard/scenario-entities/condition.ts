export class Condition {

    public selectedDevice;
    public selectedCondition;
    public conditions;
    public value;

    constructor(public devices, initOptions = {device: null, value: '', condition: null}) {

        this.selectedDevice = initOptions.device;
        this.conditions = [
            {id: 'GREATER_THAN', name: 'GREATER THAN', sign: '>'},
            {id: 'GREATER_THAN_OR_EQUAL_TO', name: 'GREATER OR EQUAL', sign: '>='},
            {id: 'LESS_THAN', name: 'LESS THAN', sign: '<'},
            {id: 'LESS_THAN_OR_EQUAL_TO', name: 'LESS THAN OR EQUAL TO', sign: '<='},
            {id: 'EQUAL_TO', name: 'EQUAL TO', sign: '=='},
            {id: 'NOT_EQUAL', name: 'NOT EQUAL', sign: '!='}
        ];
        this.selectedCondition = initOptions.condition;
        this.value = initOptions.value;
    }
}
