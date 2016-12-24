import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseOutputSensor } from '../shared/base-output-sensor/base-output-sensor';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

@Component({
    selector: 'sh-sensor-servo-widget',
    templateUrl: 'sensor-switcher-widget.template.html',
    styleUrls: [
        '../sensor-widget/sensor-widget.template.scss',
        'sensor-switcher-widget.style.scss'
    ]
})
export class SensorSwitcherWidgetComponent extends BaseOutputSensor {

    @Input() device;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

    changeDegree() {
        return this.pushEvent(true, this.data.value);
    }
}
