import { Component } from 'angular2/core';

import BaseSensor from '../base-sensor';
import template from './sensor-widget.html';
import style from '../shared/sensor-widget.scss';

@Component({
    selector: 'sm-sensor-widget',
    template,
    styles: [style],
    inputs: ['device']
})
export class SensorWidget extends BaseSensor {
}
