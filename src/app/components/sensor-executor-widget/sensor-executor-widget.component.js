import {Component} from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
import template from './sensor-executor-widget.html';
import styles from '../shared/sensor-widget.scss';

export const DEVICE_ON_STATE = 'ON';
export const DEVICE_OFF_STATE = 'OFF';
export const DEVICE_RESPOND_TIMEOUT = 4000;
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
        // NOTE: mqtt is slow and sends us false information for some time after toggle
        // we just don`t listen to socket (and mqtt) for some time to let it switch state
 
        if (this[pending] !== null) {
            return;
        }

        this.data.value = data.value === DEVICE_ON_STATE;
    }

    switchExecutor($event) {
        this[pending] = $event.target.checked;
        this.data.value = $event.target.checked;

        clearTimeout(this[timeout]);

        this[timeout] = setTimeout(() => {
            this[pending] = null;
        }, DEVICE_RESPOND_TIMEOUT);

        this.sensorWidgetService.pushEvent({
            device: this.device.mqttId,
            value: $event.target.checked ? DEVICE_ON_STATE : DEVICE_OFF_STATE
        });
    }
}
