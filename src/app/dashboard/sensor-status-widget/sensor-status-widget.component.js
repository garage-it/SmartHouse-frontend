import { Component } from '@angular/core';

import { BaseSensor } from '../shared/base-sensor/base-sensor';
import template from './sensor-status-widget.template.html';
import baseStyles from '../shared/sensor-widget/sensor-widget.style.scss';
import styles from './sensor-status-widget.style.scss';

@Component({
    selector: 'sm-sensor-status-widget',
    template,
    styles: [baseStyles, styles],
    inputs: ['device']
})
export class SensorStatusWidgetComponent extends BaseSensor {}

