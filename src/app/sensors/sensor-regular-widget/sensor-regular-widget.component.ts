import { Component, Input } from '@angular/core';
import { DeviceWidgetService } from '../device-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sh-sensor-regular-widget',
    templateUrl: './sensor-regular-widget.template.html',
    styleUrls: [
        '../device-widget.style.scss'
    ]
})
export class SensorRegularWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: DeviceWidgetService) {
        super(sensorWidgetService);
    }
}
