import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
    BaseOutputSensor,
    DEVICE_ON_STATE,
    DEVICE_OFF_STATE
} from '../shared/base-output-sensor/base-output-sensor';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

@Component({
    selector: 'sh-sensor-executor-widget',
    templateUrl: './sensor-executor-widget.template.html',
    styleUrls: ['../shared/sensor-switcher-widget/sensor-switcher-widget.style.scss']
})
export class SensorExecutorWidgetComponent extends BaseOutputSensor {

    @Input() device;
    @Input() description;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

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
