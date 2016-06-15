import {Component} from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
import template from './sensor-executor-widget.html';
import styles from '../shared/sensor-widget.scss';

export const DEVICE_ON_STATE = 'ON';
export const DEVICE_OFF_STATE = 'OFF';
export const DEVICE_RESPOND_TIMEOUT = 5000;
const pending = Symbol('pending');
const timeout = Symbol('timeout');

@Component({
    selector: 'sm-sensor-executor-widget',
    template,
    styles: [styles],
    inputs: ['device', 'description']
})
export class SensorExecutorWidget extends BaseSensor {
    constructor(...args) {
        super(args);
        this[pending] = null;
    }

    onDeviceDataChanged(data) {
        const valueToSet = data.value === DEVICE_ON_STATE;

        if (!this[pending]) {
            this.data.value = valueToSet;
        } else if (valueToSet === this[pending]) {
            this.data.value = valueToSet;
            clearTimeout(this[timeout]);
            this[pending] = null;
        }
    }

    switchExecutor($event) {
        this[pending] = this.data.value = $event.target.checked;
        this[timeout] = setTimeout(() => {
            this[pending] = null;
        }, DEVICE_RESPOND_TIMEOUT);
        this.sensorWidgetService.pushEvent({
            device: this.device.mqttId,
            value: $event.target.checked ? DEVICE_ON_STATE : DEVICE_OFF_STATE
        });
    }
}
