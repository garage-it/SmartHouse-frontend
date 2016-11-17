import { Component, Input } from '@angular/core';

import { BaseOutputSensor } from '../shared/base-output-sensor/base-output-sensor';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

const template = require('./sensor-servo-widget.template.html');
const baseStyles = require('../shared/sensor-widget/sensor-widget.style.scss');
const styles = require('./sensor-servo-widget.style.scss');

@Component({
    selector: 'sh-sensor-servo-widget',
    template,
    styles: [baseStyles, styles]
})
export class SensorServoWidgetComponent extends BaseOutputSensor {

    @Input() device;
    @Input() description;

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

    changeDegree() {
        return this.pushEvent(true, this.data.value);
    }

}
