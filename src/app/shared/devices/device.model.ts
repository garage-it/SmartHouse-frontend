export class Device {
    _id?: string;
    description: string;
    executor: boolean;
    metrix: string;
    mqttId: string;
    servo: boolean;
    type: string;
    updateTime: string;
    posX: number;
    posY: number;

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
