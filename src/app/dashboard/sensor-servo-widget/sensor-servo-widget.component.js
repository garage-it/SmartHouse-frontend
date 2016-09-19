import {Component} from '@angular/core';

import {ServoGauge} from './servo-gauge';

import {BaseOutputSensor} from '../base-output-sensor';
import template from './sensor-servo-widget.html';
import baseStyles from '../shared/sensor-widget.scss';
import styles from './sensor-servo-widget.scss';

@Component({
    selector: 'sm-sensor-servo-widget',
    template,
    styles: [baseStyles, styles],
    directives: [ServoGauge],
    inputs: ['device', 'description']
})
export class SensorServoWidget extends BaseOutputSensor {

    changeDegree() {
        return this.pushEvent({
            condition: true,
            positiveValue: this.data.value
        });
    }

}
