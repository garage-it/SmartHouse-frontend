import { Component, Input } from '@angular/core';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';

import { BaseSensor } from '../shared/base-sensor/base-sensor';
const template = require('./sensor-widget.template.html');
const style = require('../shared/sensor-widget/sensor-widget.style.scss');

@Component({
    selector: 'sm-sensor-widget',
    template,
    styles: [style]
})
export class SensorWidgetComponent extends BaseSensor {

    @Input() device;

    constructor(sensorWidgetService: SensorWidgetService) {
        super(sensorWidgetService);
    }

}

