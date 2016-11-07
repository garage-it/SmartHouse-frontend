import {Component, Input} from '@angular/core';
const template = require('./sensor-widget.template.html');

@Component({
   selector: 'sm-sensor-widget',
    template
})
export class SensorWidgetComponent {
    @Input() device;
}
