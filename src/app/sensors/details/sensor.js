export default class Sensor {
    constructor(data = {}) {
        Object.assign(this, {
            mqttId: '',
            type: '',
            description: ''
        }, data);
    }
}
