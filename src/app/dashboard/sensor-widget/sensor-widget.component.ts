import { Component, Input } from '@angular/core';
const template = require('./sensor-widget.template.html');

@Component({
   selector: 'sh-sensor-widget',
    template
})
export class SensorWidgetComponent {
    @Input() device;
}
