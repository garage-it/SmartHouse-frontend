export default class Sensor {
    constructor(data = {}) {
        Object.assign(this, {
            id: '',
            name: '',
            type: '',
            description: ''
        }, data);
    }
}
