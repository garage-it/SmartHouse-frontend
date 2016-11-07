import { Component, Input } from '@angular/core';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';
const template = require('./sensor-regular-widget.template.html');
const style = require('../shared/sensor-widget/sensor-widget.style.scss');

@Component({
    selector: 'sensor-regular-widget',
    template,
    styles: [style]
})
export class SensorRegularWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

}

