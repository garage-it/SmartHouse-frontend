import { Component } from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
import template from './sensor-widget.html';
import style from './sensor-widget.scss';

@Component({
    selector: 'sm-sensor-widget',
    template,
    styles: [style],
    inputs: ['device']
})
export class SensorWidget extends BaseSensor {
}
