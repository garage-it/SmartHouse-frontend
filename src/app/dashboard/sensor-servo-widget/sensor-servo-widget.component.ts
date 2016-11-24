import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseOutputSensor } from '../shared/base-output-sensor/base-output-sensor';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

@Component({
    selector: 'sh-sensor-servo-widget',
    templateUrl: './sensor-servo-widget.template.html',
    styleUrls: ['../shared/sensor-widget/sensor-widget.style.scss',
        './sensor-servo-widget.style.scss']
})
export class SensorServoWidgetComponent extends BaseOutputSensor {

    @Input() device;
    @Input() description;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

    changeDegree() {
        return this.pushEvent(true, this.data.value);
    }
}
