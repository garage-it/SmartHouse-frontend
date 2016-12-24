import { Component, Input } from '@angular/core';

import { BaseOutputSensor } from '../shared/base-output-sensor/base-output-sensor';
import { DeviceWidgetService } from '../device-widget.service';

@Component({
    selector: 'sh-servo-widget',
    templateUrl: 'servo-widget.template.html',
    styleUrls: [
        '../device-widget.style.scss',
        'servo-widget.style.scss'
    ]
})
export class ServoWidgetComponent extends BaseOutputSensor {

    @Input() device;

    constructor(sensorWidgetService: DeviceWidgetService) {
        super(sensorWidgetService);
    }

    changeDegree() {
        return this.pushEvent(true, this.data.value);
    }
}
