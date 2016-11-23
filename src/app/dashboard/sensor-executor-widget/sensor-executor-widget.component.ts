import { Component, Input } from '@angular/core';

import {
    BaseOutputSensor,
    DEVICE_ON_STATE,
    DEVICE_OFF_STATE
} from '../shared/base-output-sensor/base-output-sensor';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

@Component({
    selector: 'sh-sensor-executor-widget',
    templateUrl: './sensor-executor-widget.template.html',
    styleUrls: ['../shared/sensor-widget/sensor-widget.style.scss']
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
