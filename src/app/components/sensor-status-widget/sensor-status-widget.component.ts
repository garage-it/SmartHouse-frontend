import { Component } from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
const template = require('./sensor-status-widget.html');
const baseStyles = require('../shared/sensor-widget.scss');
const styles = require('./sensor-status-widget.scss');

@Component({
    selector: 'sm-sensor-status-widget',
    template,
    styles: [baseStyles, styles],
    inputs: ['device']
})
export class SensorStatusWidget extends BaseSensor {
}
