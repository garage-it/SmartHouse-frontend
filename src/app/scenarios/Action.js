export default class {
    constructor(devices) {
        this.devices = devices;
        this.selectedDevice = null;
        this.values = [
            {id: 0, name: 'Turn ON'}, {id: 1, name: 'Turn OF'}
        ];
        this.selectedValue = '';
    }
}
