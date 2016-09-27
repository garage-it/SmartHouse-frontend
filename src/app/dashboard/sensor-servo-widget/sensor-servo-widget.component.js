import { Component } from '@angular/core';

// import { ServoGauge } from './servo-gauge';

import { BaseOutputSensor } from '../shared/base-output-sensor/base-output-sensor';
import template from './sensor-servo-widget.template.html';
import baseStyles from '../shared/sensor-widget/sensor-widget.style.scss';
import styles from './sensor-servo-widget.style.scss';

@Component({
    selector: 'sm-sensor-servo-widget',
    template,
    styles: [baseStyles, styles],
    inputs: ['device', 'description']
})
export class SensorServoWidgetComponent extends BaseOutputSensor {

    changeDegree() {
        return this.pushEvent({
            condition: true,
            positiveValue: this.data.value
        });
    }

}
