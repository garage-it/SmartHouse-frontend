import { Component } from '@angular/core';

import { BaseSensor } from '../shared/base-sensor/base-sensor';
import template from './sensor-widget.template.html';
import style from '../shared/sensor-widget/sensor-widget.style.scss';

@Component({
    selector: 'sm-sensor-widget',
    template,
    styles: [style],
    inputs: ['device']
})
export class SensorWidgetComponent extends BaseSensor {}

