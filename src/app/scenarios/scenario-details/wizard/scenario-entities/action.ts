export class Action {

    public selectedDevice;
    public values;
    public value;

    constructor(public devices, initOptions = {value: '', device: null}) {

        this.selectedDevice = initOptions.device;
        this.values = [
            {id: 'ON', name: 'Turn ON'}, {id: 'OFF', name: 'Turn OFF'}
        ];
        this.value = initOptions.value;
    }
}
