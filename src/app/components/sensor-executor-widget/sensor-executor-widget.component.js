import { Component } from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
import template from './sensor-executor-widget.html';
import styles from '../shared/sensor-widget.scss';

export const DEVICE_ON_STATE = 'ON';
export const DEVICE_OFF_STATE = 'OFF';

@Component({
    selector: 'sm-sensor-executor-widget',
    template,
    styles: [styles],
    inputs: ['device', 'description']
})
export class SensorExecutorWidget extends BaseSensor {

    onDeviceDataChanged(data) {
        this.data.value = data.value === DEVICE_ON_STATE;
    }

    switchExecutor($event) {
        this.sensorWidgetService.pushEvent({
            device: this.device.mqttId,
            value: $event.target.checked ? DEVICE_ON_STATE : DEVICE_OFF_STATE
        });
    }
}
