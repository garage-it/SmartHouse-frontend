import { Component, Input } from '@angular/core';
import { DeviceWidgetService } from '../device-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sh-device-sensor-widget',
    templateUrl: 'device-sensor-widget.template.html',
    styleUrls: [
        '../device-widget.style.scss'
    ]
})
export class DeviceSensorWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: DeviceWidgetService) {
        super(sensorWidgetService);
    }
}
