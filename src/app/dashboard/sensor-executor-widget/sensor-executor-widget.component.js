import {Component} from '@angular/core';

import {BaseOutputSensor, DEVICE_ON_STATE, DEVICE_OFF_STATE} from '../base-output-sensor';
import template from './sensor-executor-widget.html';
import styles from '../shared/sensor-widget.scss';

@Component({
    selector: 'sm-sensor-executor-widget',
    template,
    styles: [styles],
    inputs: ['device', 'description']
})
export class SensorExecutorWidget extends BaseOutputSensor {

    fromDeviceRepresentation(value) {
        return value === DEVICE_ON_STATE;
    }

    switchExecutor($event) {
        return this.pushEvent({
            condition: $event.target.checked,
            positiveValue: DEVICE_ON_STATE,
            negativeValue: DEVICE_OFF_STATE
        });
    }

}
