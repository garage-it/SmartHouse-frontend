import { Component } from '@angular/core';

import BaseSensor from '../base-sensor';
import template from './sensor-status-widget.html';
import baseStyles from '../shared/sensor-widget.scss';
import styles from './sensor-status-widget.scss';

@Component({
    selector: 'sm-sensor-status-widget',
    template,
    styles: [baseStyles, styles],
    inputs: ['device']
})
export class SensorStatusWidget extends BaseSensor {
}
