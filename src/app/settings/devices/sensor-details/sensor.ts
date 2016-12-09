export class Sensor {
    mqttId: string;
    type: string;
    executor: boolean;
    servo: boolean;
    metrics: string;

    constructor(data = {}) {
        Object.assign(this, {
            mqttId: '',
            type: '',
            description: '',
            executor: false,
            sensor: false
        }, data);
    }
}
