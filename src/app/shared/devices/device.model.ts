export class Device {
    _id?: string;
    description: string;
    executor: boolean;
    metrix: string;
    mqttId: string;
    servo: boolean;
    type: string;
    updateTime: string;
    posX: Number;
    posY: Number;

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
