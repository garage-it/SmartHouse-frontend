export default class {
    constructor(devices, initOptions = {}) {
        this.devices = devices;
        this.selectedDevice = initOptions.device || null;
        this.values = [
            {id: 'ON', name: 'Turn ON'}, {id: 'OFF', name: 'Turn OFF'}
        ];
        this.value = initOptions.value || '';
    }
}
