import { Component } from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
const template = require('./sensor-widget.html');
const style = require('../shared/sensor-widget.scss');

@Component({
    selector: 'sm-sensor-widget',
    template,
    styles: [style],
    inputs: ['device']
})
export class SensorWidget extends BaseSensor {
}
