import { Component, Input } from '@angular/core';

import {
    BaseOutputSensor,
    DEVICE_ON_STATE,
    DEVICE_OFF_STATE
} from '../shared/base-output-sensor/base-output-sensor';
import { DeviceWidgetService } from '../device-widget.service';

@Component({
    selector: 'sh-switcher-widget',
    templateUrl: 'switcher-widget.template.html',
    styleUrls: [
        'switcher-widget.style.scss',
        '../device-widget.style.scss'
    ]
})
export class SwitcherWidgetComponent extends BaseOutputSensor {

    @Input() device;

    fromDeviceRepresentation(value) {
        return value === DEVICE_ON_STATE;
    }

    constructor(sensorWidgetService: DeviceWidgetService) {
        super(sensorWidgetService);
    }

    switchExecutor($event) {
        return this.pushEvent($event.target.checked, DEVICE_ON_STATE, DEVICE_OFF_STATE);
    }
}
