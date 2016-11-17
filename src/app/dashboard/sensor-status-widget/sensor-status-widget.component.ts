import { Component, Input } from '@angular/core';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

const template = require('./sensor-status-widget.template.html');
const baseStyles = require('../shared/sensor-widget/sensor-widget.style.scss');
const styles = require('./sensor-status-widget.style.scss');

@Component({
    selector: 'sh-sensor-status-widget',
    template,
    styles: [baseStyles, styles]
})
export class SensorStatusWidgetComponent extends BaseSensor {

    @Input() device;

}
