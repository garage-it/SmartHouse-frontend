import { BaseSensor } from '../base-sensor/base-sensor';
import { SensorWidgetService } from '../sensor-widget/sensor-widget.service';

export const DEVICE_ON_STATE = 'ON';
export const DEVICE_OFF_STATE = 'OFF';
export const DEVICE_RESPOND_TIMEOUT = 1000;

const pending = Symbol('pending');
const timeout = Symbol('timeout');

export class BaseOutputSensor extends BaseSensor {

    static getConditionResult(condition, self, args) {
        const isFunction = f => typeof f === 'function';
        return isFunction(condition) ? condition.apply(self, args) : condition;
    }

    static generateValue(condition, positiveValue, negativeValue= null, self?, args?) {
        return BaseOutputSensor.getConditionResult(condition, self, args) ? positiveValue : negativeValue;
    }

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
        this[pending] = null;
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

        if (this.device.mqttId === data.device) {
            const rawValue = BaseOutputSensor.generateValue(true, data.value);
            this.data.value = this.fromDeviceRepresentation(rawValue);
            this.data.updateTime = new Date();
        }
    }

    pushEvent(condition, positiveValue, negativeValue= null, self?, args?) {
        this[pending] = true;

        clearTimeout(this[timeout]);

        this[timeout] = setTimeout(() => {
            this[pending] = null;
        }, DEVICE_RESPOND_TIMEOUT);

        this.data.value = BaseOutputSensor.generateValue(condition, positiveValue, negativeValue, self, args);

        this.sensorWidgetService.pushEvent({
            device: this.device.mqttId,
            value: this.toDeviceRepresentation(this.data.value)
        });
    }
}
