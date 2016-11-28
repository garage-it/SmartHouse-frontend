import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sh-sensor-regular-widget',
    templateUrl: './sensor-regular-widget.template.html',
    styleUrls: ['../shared/sensor-widget/sensor-widget.style.scss']
})
export class SensorRegularWidgetComponent extends BaseSensor {

    @Input() device;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }
}

