import { Component, Input } from '@angular/core';

import { BaseOutputSensor } from '../shared/base-output-sensor/base-output-sensor';
import { DeviceWidgetService } from '../device-widget.service';

@Component({
    selector: 'sh-sensor-servo-widget',
    templateUrl: 'sensor-switcher-widget.template.html',
    styleUrls: [
        '../device-widget.style.scss',
        'sensor-switcher-widget.style.scss'
    ]
})
export class SensorSwitcherWidgetComponent extends BaseOutputSensor {

    @Input() device;

    constructor(sensorWidgetService: DeviceWidgetService) {
        super(sensorWidgetService);
    }

    changeDegree() {
        return this.pushEvent(true, this.data.value);
    }
}
