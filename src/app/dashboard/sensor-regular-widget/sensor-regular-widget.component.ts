import { Component, Input } from '@angular/core';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sensor-regular-widget',
    templateUrl: './sensor-regular-widget.template.html',
    styleUrls: ['../shared/sensor-widget/sensor-widget.style.scss']
})
export class SensorRegularWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

}

