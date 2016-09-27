import { Component, Input } from '@angular/core';

import {
    BaseOutputSensor,
    DEVICE_ON_STATE,
    DEVICE_OFF_STATE
} from '../shared/base-output-sensor/base-output-sensor';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

const template = require('./sensor-executor-widget.template.html');
const styles = require('../shared/sensor-widget/sensor-widget.style.scss');

@Component({
    selector: 'sm-sensor-executor-widget',
    template,
    styles: [styles]
})
export class SensorExecutorWidgetComponent extends BaseOutputSensor {

    @Input() device;
    @Input() description;

    fromDeviceRepresentation(value) {
        return value === DEVICE_ON_STATE;
    }

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

    switchExecutor($event) {
        return this.pushEvent($event.target.checked, DEVICE_ON_STATE, DEVICE_OFF_STATE);
    }

}
