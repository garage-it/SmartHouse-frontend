import { Component, Input } from '@angular/core';
import { DeviceWidgetService } from '../device-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sh-sensor-widget',
    templateUrl: 'sensor-widget.template.html',
    styleUrls: [
        '../device-widget.style.scss'
    ]
})
export class SensorWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: DeviceWidgetService) {
        super(sensorWidgetService);
    }
}
