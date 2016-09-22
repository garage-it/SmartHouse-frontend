import { BaseSensor } from '../base-sensor/base-sensor';

export const DEVICE_ON_STATE = 'ON';
export const DEVICE_OFF_STATE = 'OFF';
export const DEVICE_RESPOND_TIMEOUT = 4000;

const pending = Symbol('pending');
const timeout = Symbol('timeout');


export class BaseOutputSensor extends BaseSensor {

    constructor(...args) {
        super(...args);
        this[pending] = null;
    }

    getConditionResult(condition, self, args) {
        const isFunction = f => typeof f === 'function';
        return isFunction(condition) ? condition.apply(self, args) : condition;
    }

    generateValue({condition, self, args, positiveValue, negativeValue} = {}) {
        return this.getConditionResult(condition, self, args) ? positiveValue : negativeValue;
    }

    toDeviceRepresentation(value) {
        return value;
    }

    fromDeviceRepresentation(value) {
        return value;
    }

    onDeviceDataChanged(data) {
        // NOTE: mqtt is slow and sends us false information for some time after toggle
        // we just don`t listen to socket (and mqtt) for some time to let it switch state
        if (this[pending] !== null) {
            return;
        }

        const rawValue = this.generateValue({
            condition: true,
            positiveValue: data.value,
            negativeValue: null
        });
        this.data.value = this.fromDeviceRepresentation(rawValue);
    }

    pushEvent({condition, self, args, positiveValue, negativeValue} = {}) {
        this[pending] = true;

        clearTimeout(this[timeout]);

        this[timeout] = setTimeout(() => {
            this[pending] = null;
        }, DEVICE_RESPOND_TIMEOUT);

        this.data.value = this.generateValue({condition, self, args, positiveValue, negativeValue});

        this.sensorWidgetService.pushEvent({
            device: this.device.mqttId,
            value: this.toDeviceRepresentation(this.data.value)
        });
    }
}
