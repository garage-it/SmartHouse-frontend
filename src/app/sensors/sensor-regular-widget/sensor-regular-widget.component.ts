import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sh-sensor-regular-widget',
    templateUrl: './sensor-regular-widget.template.html',
    styleUrls: [
        '../sensor-widget/sensor-widget.template.scss'
    ]
})
export class SensorRegularWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }
}
